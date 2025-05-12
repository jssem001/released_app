import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { useAppNavigation } from '../components/Navigation';
import { listInboxMessages, getMessageDetail } from '../services/gmailApi';
import { extractUnsubscribeLink } from '../utils/unsubscribeParser';

export default function Scanning() {
  const [progress, setProgress] = useState(0);
  const [found, setFound] = useState([]);
  const { toDashboard } = useAppNavigation();

useEffect(() => {
    let isMounted = true;
    const MAX_TOTAL_MESSAGES = 100;

    async function scanInbox() {
      try {
        // Step 1: Fetch up to 100 messages
        const { messages = [] } = await listInboxMessages(['INBOX'], MAX_TOTAL_MESSAGES);

        const subscriptions = [];

        // Step 2: Scan each message
        for (let i = 0; i < messages.length; i++) {
          const { id } = messages[i];

          try {
            const detail = await getMessageDetail(id);
            const link = extractUnsubscribeLink(detail);

            if (link) {
              const sub = {
                id,
                from: detail.payload.headers.find(h => h.name === 'From')?.value,
                subject: detail.payload.headers.find(h => h.name === 'Subject')?.value,
                unsubscribeLink: link,
              };

              subscriptions.push(sub);

              if (isMounted) {
                setFound(prev => [...prev, sub]);
              }
            }
          } catch (err) {
            console.warn(`Skipping message ${id}:`, err.message);
          }

          if (isMounted) {
            setProgress(Math.round(((i + 1) / MAX_TOTAL_MESSAGES) * 100));
          }
        }

        // Optional: small delay to let UI catch up
        await new Promise(res => setTimeout(res, 500));

        if (isMounted) {
          toDashboard({ subscriptions });
        }

      } catch (err) {
        console.error('Scan error:', err);
        // TODO: show user-facing error or retry option
      }
    }

    scanInbox();

    return () => {
      isMounted = false;
    };
  }, [toDashboard]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-white p-6">
      <div className="mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <RefreshCw size={32} className="text-blue-600 animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-center text-gray-800">Scanning your inbox</h2>
        <p className="text-sm text-center text-gray-600 mt-2">Identifying your subscriptions...</p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-xs text-gray-500">{progress}% complete</p>

      <div className="mt-8 w-full overflow-y-auto max-h-48">
        {found.map((sub) => (
          <div key={sub.id} className="flex items-center mb-3 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
              <span className="text-xs font-semibold">{sub.from?.[0] || '?'}</span>
            </div>
            <div>
              <p className="text-sm font-medium truncate">{sub.subject}</p>
              <p className="text-xs text-gray-500 truncate">Subscription found</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

