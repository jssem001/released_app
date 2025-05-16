import { getAccessToken } from '../auth/gmailAuth';

/**
 * List messages in the user's Gmail inbox, paginated.
 * @param {string[]} labelIds - Gmail label filters (e.g., ['INBOX'])
 * @param {number} maxResults - Max messages to fetch per page (max 500)
 * @param {string|null} pageToken - Optional: token for next page
 * @param {string} senderEmail  – e.g. "news@newsletter.com"
 * @param {string} accessToken  – OAuth2 Bearer token with Gmail scopes
 * @returns {Promise<{ messages: object[], nextPageToken?: string }>}
 */
export async function listInboxMessages(labelIds = ['INBOX'], maxResults = 50, pageToken = null) {
  const accessToken = getAccessToken();
  const params = new URLSearchParams({
    labelIds: labelIds.join(','),
    maxResults: maxResults.toString(),
  });
  if (pageToken) {
    params.append('pageToken', pageToken);
  }

  const response = await fetch(`https://www.googleapis.com/gmail/v1/users/me/messages?${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Gmail list error: ${error.error.message}`);
  }

  return await response.json(); // returns { messages, nextPageToken }
}

/**
 * Retrieve full details of a specific Gmail message.
 * @param {string} messageId - The Gmail message ID
 * @returns {Promise<object>} - Full Gmail message object
 */
export async function getMessageDetail(messageId) {
  const accessToken = getAccessToken();

  const response = await fetch(
    `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Gmail message error: ${error.error.message}`);
  }

  return await response.json();
}

export async function createUnsubscribeFilter(senderEmail, accessToken) {
  const body = {
    criteria: { from: senderEmail },
    action:  { removeLabelIds: ["INBOX"], addLabelIds: ["TRASH"] }
  };

  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/settings/filters`,
    {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    console.warn("Failed to create filter for", senderEmail, await res.text());
    return false;
  }
  return true;
}

export async function listFilters(accessToken) {
  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/settings/filters`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error(`Gmail listFilters error: ${(await res.text())}`);
  }
  let data;
    try {
      data = await res.json();
    } catch {
      return [];
    }
    return data.filter || [];
}