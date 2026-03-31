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
}

export async function fireServerEvent({
  eventName,
  email,
  sourceUrl,
  customData,
}: FBEventOptions): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return;

  const userData: Record<string, unknown> = {};
  if (email) {
    userData.em = [hashSHA256(email)];
  }

  try {
    await fetch(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: ACCESS_TOKEN,
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            event_source_url: sourceUrl,
            user_data: userData,
            custom_data: customData,
          },
        ],
      }),
    });
  } catch {
    // Silently fail — tracking should never break the user flow
  }
}
