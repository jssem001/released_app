// src/utils/unsubscribeParser.js

/**
 * Regex to extract a URL from a List-Unsubscribe header:
 *   List-Unsubscribe: <https://...>, <mailto:...>
 */
const HEADER_UNSUBSCRIBE = /<([^>]+)>/;

/**
 * Regex to find an “unsubscribe” link in HTML body:
 *   <a href="https://..." ...>unsubscribe</a>
 */
const HTML_UNSUBSCRIBE = /<a\s+[^>]*href="([^"]+)"[^>]*>\s*unsubscribe\s*<\/a>/i;

/**
 * Given a Gmail message object (format=full), attempt to extract
 * the unsubscribe URL from headers or HTML parts.
 *
 * @param {object} message  – Gmail API message payload
 * @returns {string|null}   – unsubscribe link or null if none found
 */
export function extractUnsubscribeLink(message) {
  const headers = message.payload.headers || [];

  // 1) Try the List-Unsubscribe header
  const unsubscribeHdr = headers.find(h => 
    h.name.toLowerCase() === 'list-unsubscribe'
  );
  if (unsubscribeHdr) {
    const match = HEADER_UNSUBSCRIBE.exec(unsubscribeHdr.value);
    if (match && match[1]) {
      return match[1];
    }
  }

  // 2) Fallback: scan HTML parts for an “unsubscribe” anchor
  const parts = message.payload.parts || [];
  for (let part of parts) {
    if (part.mimeType === 'text/html' && part.body?.data) {
      // Gmail returns base64url-encoded body.data
      const html = atob(
        part.body.data
          .replace(/-/g, '+')
          .replace(/_/g, '/')
      );
      const match = HTML_UNSUBSCRIBE.exec(html);
      if (match && match[1]) {
        return match[1];
      }
    }
  }

  // Nothing found
  return null;
}
