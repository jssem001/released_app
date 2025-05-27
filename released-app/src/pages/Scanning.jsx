import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { useAppNavigation } from '../components/Navigation';
import { listInboxMessages, getMessageDetail } from '../services/gmailApi';
import { extractUnsubscribeLink } from '../utils/unsubscribeParser';
import axios from 'axios';

export default function Scanning() {
  const [progress, setProgress] = useState(0);
  const [found, setFound] = useState([]);
  const { toDashboard } = useAppNavigation();

  useEffect(() => {
    console.log('🔍 scanInbox effect running once');
    let isMounted = true;
    const MAX_TOTAL_MESSAGES = 100;

    (async () => {
      try {
        // fetch up to 100 messages
        const { messages = [] } = await listInboxMessages(['INBOX'], MAX_TOTAL_MESSAGES);
        const total = Math.min(messages.length, MAX_TOTAL_MESSAGES);
        const subscriptions = [];

        for (let i = 0; i < total; i++) {
          const { id } = messages[i];
          try {
            const detail = await getMessageDetail(id);
            const link = extractUnsubscribeLink(detail);
            if (link) {
              subscriptions.push({
                id,
                from: detail.payload.headers.find(h => h.name === 'From')?.value,
                subject: detail.payload.headers.find(h => h.name === 'Subject')?.value,
                unsubscribeLink: link,
              });
            }
          } catch (e) {
            console.warn(`Skipping ${id}:`, e.message);
          }
          if (isMounted) {
            setProgress(Math.round(((i + 1) / total) * 100));
          }
        }

        if (!isMounted) return;
        setFound(subscriptions);

        // small delay so progress bar visibly reaches 100%
        await new Promise(r => setTimeout(r, 500));

        console.log('✅ scan complete:', subscriptions);

        // ▶️ bulk save to backend
        const jwt = localStorage.getItem('jwt');
        try {
          await axios.post(
            'http://localhost:5000/subscriptions/bulk',
            subscriptions,
            { headers: { Authorization: `Bearer ${jwt}` } }
          );
          console.log('👍 subscriptions saved to backend');
        } catch (e) {
          console.error('❌ failed to save subscriptions:', e);
        }

        // ▶️ navigate with the list
        toDashboard(subscriptions);

      } catch (err) {
        console.error('Fatal scan error:', err);
      }
    })();

    return () => {
      console.log('❎ scanInbox effect cleanup');
      isMounted = false;
    };
  }, []);

  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center bg-white p-4">
      <div className="mb-5 text-center">
        <div
          className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-4"
          style={{ width: '64px', height: '64px' }}
        >
          <RefreshCw size={32} className="text-primary spinner-border spinner-border-sm" />
        </div>
        <h2 className="fs-5 fw-semibold text-dark">Scanning your inbox</h2>
        <p className="text-muted small mt-2">Identifying your subscriptions...</p>
      </div>

      <div className="w-100 mb-2">
        <div className="progress" style={{ height: '8px' }}>
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <p className="small text-muted mt-1">{progress}% complete</p>
      </div>

      <div className="mt-4 w-100 overflow-auto" style={{ maxHeight: '12rem' }}>
        {found.map(sub => (
          <div
            key={sub.id}
            className="d-flex align-items-center border-bottom border-light-subtle pb-2 mb-2"
          >
            <div
              className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
              style={{ width: '32px', height: '32px' }}
            >
              <span className="text-muted small fw-bold">{sub.from?.[0] || '?'}</span>
            </div>
            <div className="flex-grow-1">
              <p className="mb-0 fw-semibold text-truncate">{sub.subject}</p>
              <p className="mb-0 text-muted small">Subscription found</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



// import React, { useState, useEffect } from 'react';
// import { RefreshCw } from 'lucide-react';
// import { useAppNavigation } from '../components/Navigation';
// import { listInboxMessages, getMessageDetail } from '../services/gmailApi';
// import { extractUnsubscribeLink } from '../utils/unsubscribeParser';
// import axios from 'axios';

// export default function Scanning() {
//   const [progress, setProgress] = useState(0);
//   const [found, setFound] = useState([]);
//   const { toDashboard } = useAppNavigation();

//   useEffect(() => {
//     console.log('🔍 scanInbox effect running once');
//     let isMounted = true;
//     const MAX_TOTAL_MESSAGES = 100;

//     (async () => {
//       try {
//         // fetch up to 100 messages
//         const { messages = [] } = await listInboxMessages(['INBOX'], MAX_TOTAL_MESSAGES);
//         const total = Math.min(messages.length, MAX_TOTAL_MESSAGES);
//         const subscriptions = [];

//         for (let i = 0; i < total; i++) {
//           const { id } = messages[i];
//           try {
//             const detail = await getMessageDetail(id);
//             const link = extractUnsubscribeLink(detail);
//             if (link) subscriptions.push({
//               id,
//               from: detail.payload.headers.find(h => h.name === 'From')?.value,
//               subject: detail.payload.headers.find(h => h.name === 'Subject')?.value,
//               unsubscribeLink: link,
//             });
//           } catch (e) {
//             console.warn(`Skipping ${id}:`, e.message);
//           }
//           if (isMounted) setProgress(Math.round(((i + 1) / total) * 100));
//         }

//         // if (isMounted) {
//         //   setFound(subscriptions);
//         //   // small delay so progress bar hits 100%
//         //   await new Promise(r => setTimeout(r, 500));
//         //   console.log('✅ scan complete');
//         //   console.log('🔔 FINAL SUBSCRIPTIONS:', subscriptions);
//         //   toDashboard(subscriptions);
//         // }
//         if (!isMounted) return;
//         setFound(subscriptions);

//         // small delay so progress bar visibly reaches 100%
//         await new Promise(r => setTimeout(r, 500));

//         console.log('✅ scan complete:', subscriptions);

//         // ▶️ bulk save to backend
//         const jwt = localStorage.getItem('jwt');
//         try {
//           await axios.post(
//             'http://localhost:5000/subscriptions/bulk',
//             subscriptions,
//             { headers: { Authorization: `Bearer ${jwt}` } }
//           );
//           console.log('👍 subscriptions saved to backend');
//         } catch (e) {
//           console.error('❌ failed to save subscriptions:', e);
//         }

//         // ▶️ navigate with the list
//         toDashboard(subscriptions);
//       }

//       } catch (err) {
//         console.error('Fatal scan error:', err);
//       }
//     })();

//     return () => {
//       console.log('❎ scanInbox effect cleanup');
//       isMounted = false;
//     };
    
//   // }, []);
//   }, [toDashboard]);
  

//   return (
//     <div className="h-100 d-flex flex-column align-items-center justify-content-center bg-white p-4">
//       <div className="mb-5 text-center">
//         <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '64px', height: '64px' }}>
//           <RefreshCw size={32} className="text-primary spinner-border spinner-border-sm" />
//         </div>
//         <h2 className="fs-5 fw-semibold text-dark">Scanning your inbox</h2>
//         <p className="text-muted small mt-2">Identifying your subscriptions...</p>
//       </div>

//       <div className="w-100 mb-2">
//         <div className="progress" style={{ height: '8px' }}>
//           <div
//             className="progress-bar bg-primary"
//             role="progressbar"
//             style={{ width: `${progress}%` }}
//             aria-valuenow={progress}
//             aria-valuemin="0"
//             aria-valuemax="100"
//           ></div>
//         </div>
//         <p className="small text-muted mt-1">{progress}% complete</p>
//       </div>

//       <div className="mt-4 w-100 overflow-auto" style={{ maxHeight: '12rem' }}>
//         {found.map((sub) => (
//           <div key={sub.id} className="d-flex align-items-center border-bottom border-light-subtle pb-2 mb-2">
//             <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '32px', height: '32px' }}>
//               <span className="text-muted small fw-bold">{sub.from?.[0] || '?'}</span>
//             </div>
//             <div className="flex-grow-1">
//               <p className="mb-0 fw-semibold text-truncate">{sub.subject}</p>
//               <p className="mb-0 text-muted small">Subscription found</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
