import { createHmac, timingSafeEqual } from "node:crypto";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { NextRequest, NextResponse } from "next/server";

export const ADMIN_AUTH_COOKIE = "thcloud_admin_session";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function requireEnv(name: string, minLength = 1) {
  const value = process.env[name];
  if (!value || value.length < minLength) {
    throw new Error(
      `${name} must be set${minLength > 1 ? ` (min length ${minLength})` : ""}`
    );
  }
  return value;
}

function getAdminUsername() {
  return requireEnv("ADMIN_USERNAME");
}

function getAdminPassword() {
  return requireEnv("ADMIN_PASSWORD", 8);
}

function getSessionSecret() {
  return requireEnv("ADMIN_SESSION_SECRET", 32);
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function getAdminDefaultCredentials() {
  return {
    username: getAdminUsername(),
    password: getAdminPassword(),
  };
}

export function validateAdminCredentials(username: string, password: string) {
  return username === getAdminUsername() && password === getAdminPassword();
}

export function createAdminSessionToken(username: string) {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${username}:${expiresAt}`;
  const signature = sign(payload);
  return `${payload}:${signature}`;
}

export function verifyAdminSessionToken(token: string) {
  const [username, expiresAtRaw, signature] = token.split(":");

  if (!username || !expiresAtRaw || !signature) {
    return false;
  }

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return false;
  }

  const expectedSignature = sign(`${username}:${expiresAtRaw}`);
  return username === getAdminUsername() && safeEqual(signature, expectedSignature);
}

export function isAdminCookieAuthenticated(cookieStore: Pick<ReadonlyRequestCookies, "get">) {
  const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;
  return token ? verifyAdminSessionToken(token) : false;
}

export function isAdminRequestAuthenticated(request: NextRequest) {
  return isAdminCookieAuthenticated(request.cookies);
}

export function setAdminSessionCookie(response: NextResponse, username: string) {
  response.cookies.set({
    name: ADMIN_AUTH_COOKIE,
    value: createAdminSessionToken(username),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_AUTH_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}
