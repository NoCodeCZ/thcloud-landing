const LISTMONK_URL = process.env.LISTMONK_URL;
const LISTMONK_USERNAME = process.env.LISTMONK_USERNAME;
const LISTMONK_PASSWORD = process.env.LISTMONK_PASSWORD;

function getAuthHeader() {
  return (
    "Basic " +
    Buffer.from(`${LISTMONK_USERNAME}:${LISTMONK_PASSWORD}`).toString("base64")
  );
}

export async function createOrUpdateSubscriber(
  email: string,
  name: string,
  lists: number[],
  attributes?: Record<string, string>
) {
  if (!LISTMONK_URL || !LISTMONK_USERNAME || !LISTMONK_PASSWORD) {
    throw new Error("Listmonk environment variables not configured");
  }

  const res = await fetch(`${LISTMONK_URL}/api/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify({
      email,
      name,
      status: "enabled",
      lists,
      attribs: attributes || {},
    }),
  });

  if (res.status === 409) {
    // Subscriber exists — update lists and attributes
    const searchRes = await fetch(
      `${LISTMONK_URL}/api/subscribers?query=subscribers.email='${encodeURIComponent(email)}'`,
      {
        headers: { Authorization: getAuthHeader() },
      }
    );
    const searchData = await searchRes.json();
    const subscriber = searchData.data?.results?.[0];

    if (subscriber) {
      await fetch(`${LISTMONK_URL}/api/subscribers/${subscriber.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAuthHeader(),
        },
        body: JSON.stringify({
          email,
          name,
          status: "enabled",
          lists,
          attribs: { ...subscriber.attribs, ...attributes },
        }),
      });
    }
    return { success: true, updated: true };
  }

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Listmonk API error: ${error}`);
  }

  return { success: true, updated: false };
}
