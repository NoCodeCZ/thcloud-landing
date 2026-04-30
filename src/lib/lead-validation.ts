const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "mail.com",
  "gmx.com",
  "live.com",
  "msn.com",
]);

const BLOCKED_EMAIL_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "test.com",
  "test.co",
  "fake.com",
  "mailinator.com",
  "10minutemail.com",
  "tempmail.com",
  "guerrillamail.com",
]);

const FAKE_WORDS = [
  "test",
  "fake",
  "asdf",
  "qwer",
  "dummy",
  "sample",
  "demo",
  "none",
  "n/a",
  "na",
  "xxx",
  "12345",
];

export type LeadValidationPayload = {
  email?: string;
  firstName?: string;
  company?: string;
  phone?: string;
  companySize?: string;
  industry?: string;
  role?: string;
  consent?: boolean;
  source?: string;
};

function clean(value?: string) {
  return String(value ?? "").trim();
}

function hasFakeWord(value: string) {
  const tokens = value.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  return tokens.some((token) =>
    FAKE_WORDS.some((word) =>
      word.length <= 2 ? token === word : token === word || token.startsWith(word)
    )
  );
}

function isKeyboardSmash(value: string) {
  const compact = value.toLowerCase().replace(/[^a-z0-9]/g, "");
  return /^(.)\1{3,}$/.test(compact) || /^(?:123456|abcdef|qwerty|asdfgh|000000|111111)/.test(compact);
}

function looksFake(value?: string) {
  const text = clean(value);
  if (!text) return true;
  return hasFakeWord(text) || isKeyboardSmash(text);
}

function isPlausiblePhone(value?: string) {
  const digits = clean(value).replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return false;
  if (/^(\d)\1+$/.test(digits)) return false;
  if (/^(?:0123456789|123456789|987654321|00000000|11111111)/.test(digits)) return false;
  return true;
}

export function validateLeadPayload(payload: LeadValidationPayload): string | null {
  const email = clean(payload.email).toLowerCase();
  const firstName = clean(payload.firstName);
  const company = clean(payload.company);
  const phone = clean(payload.phone);
  const companySize = clean(payload.companySize);
  const industry = clean(payload.industry);
  const role = clean(payload.role);

  if (!email) return "Email is required";
  if (!EMAIL_RE.test(email)) return "Please enter a valid email address";

  const domain = email.split("@")[1] ?? "";
  const localPart = email.split("@")[0] ?? "";
  if (BLOCKED_EMAIL_DOMAINS.has(domain) || looksFake(localPart)) {
    return "Please use your real company email address";
  }
  if (FREE_EMAIL_DOMAINS.has(domain)) {
    return "Please use a company email address, not a personal email";
  }

  const requiresBusinessDetails =
    payload.source === "blueprint-hero-form" ||
    Boolean(firstName || company || phone || companySize || industry || role);

  if (!requiresBusinessDetails) return null;

  if (!firstName || !company || !phone || !companySize || !industry || !role || !payload.consent) {
    return "Please complete all required fields before continuing";
  }

  if (firstName.length < 2 || looksFake(firstName)) return "Please enter your real first name";
  if (company.length < 2 || looksFake(company)) return "Please enter your real company name";
  if (!isPlausiblePhone(phone)) return "Please enter a valid phone number";

  return null;
}
