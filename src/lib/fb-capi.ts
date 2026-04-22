import { createHash } from "crypto";

const PIXEL_ID = process.env.FB_PIXEL_ID;
const ACCESS_TOKEN = process.env.FB_CAPI_ACCESS_TOKEN;

function hashSHA256(value: string): string {
  return createHash("sha256")
    .update(value.toLowerCase().trim())
    .digest("hex");
}

export type FBEventName =
  | "Lead"
  | "CompleteRegistration"
  | "SubmitApplication"
  | "Schedule"
  | "ViewContent"
  | "PageView";

interface FBEventOptions {
  eventName: FBEventName;
  email?: string;
  sourceUrl?: string;
  customData?: Record<string, string>;
  eventId?: string;
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  userAgent?: string;
}

export async function fireServerEvent({
  eventName,
  email,
  sourceUrl,
  customData,
  eventId,
  fbp,
  fbc,
  clientIp,
  userAgent,
}: FBEventOptions): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return;

  const userData: Record<string, unknown> = {};
  if (email) userData.em = [hashSHA256(email)];
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;
  if (clientIp) userData.client_ip_address = clientIp;
  if (userAgent) userData.client_user_agent = userAgent;

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: ACCESS_TOKEN,
          data: [
            {
              event_name: eventName,
              event_time: Math.floor(Date.now() / 1000),
              event_id: eventId,
              action_source: "website",
              event_source_url: sourceUrl,
              user_data: userData,
              custom_data: customData,
            },
          ],
        }),
      }
    );
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("FB CAPI non-2xx", { status: response.status, body: text.slice(0, 500) });
    }
  } catch (err) {
    console.error("FB CAPI error", err);
  }
}

export function extractFbContext(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map((c) => c.trim().split("="))
      .filter((p) => p.length === 2)
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
  const xff = request.headers.get("x-forwarded-for") || "";
  const clientIp = xff.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined;
  return {
    fbp: cookies["_fbp"] || undefined,
    fbc: cookies["_fbc"] || undefined,
    clientIp,
    userAgent: request.headers.get("user-agent") || undefined,
  };
}
