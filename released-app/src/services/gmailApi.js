import { getAccessToken } from '../auth/gmailAuth';

/**
 * List messages in the user's Gmail inbox, paginated.
 * @param {string[]} labelIds - Gmail label filters (e.g., ['INBOX'])
 * @param {number} maxResults - Max messages to fetch per page (max 500)
 * @param {string|null} pageToken - Optional: token for next page
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

// import { getAccessToken } from '../auth/gmailAuth';

// /**
//  * List messages in the user’s mailbox.
//  * @param {string[]} labelIds  – array of label IDs (e.g. ['INBOX'])
//  * @param {number}   maxResults – how many to fetch (up to 500)
//  */
// export async function listInboxMessages(labelIds = ['INBOX'], maxResults = 100) {
//   const accessToken = getAccessToken();
//   const params = new URLSearchParams({
//     labelIds:   labelIds.join(','),
//     maxResults: maxResults.toString(),
//   });

//   const res = await fetch(`https://www.googleapis.com/gmail/v1/users/me/messages?${params}`, {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   if (!res.ok) {
//     const err = await res.json();
//     throw new Error(`Gmail list error: ${err.error.message}`);
//   }
//   const { messages = [] } = await res.json();
//   return messages; // array of { id, threadId }
// }

// /**
//  * Fetch the full message payload for a given message ID.
//  * @param {string} messageId
//  */
// export async function getMessageDetail(messageId) {
//   const accessToken = getAccessToken();

//   const res = await fetch(
//     `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
//     { headers: { Authorization: `Bearer ${accessToken}` } }
//   );

//   if (!res.ok) {
//     const err = await res.json();
//     throw new Error(`Gmail message error: ${err.error.message}`);
//   }
//   return await res.json(); // full message object
// }
