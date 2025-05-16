// src/screens/UnsubscribeProcess.jsx

import React, { useState, useEffect } from "react";
import { RefreshCw, Check, X } from "lucide-react";
import { useAppNavigation } from "../components/Navigation";
import { useLocation } from "react-router-dom";
import { getAccessToken } from "../auth/gmailAuth";
import { createUnsubscribeFilter } from "../services/gmailApi";

export default function UnsubscribeProcess() {
  const { toDashboard } = useAppNavigation();
  const location = useLocation();

  // Expect: location.state.subscriptions = [{ id, from, unsubscribeLink, listUnsubscribeUrl? }, …]
  const selected = location.state?.subscriptions || [];

  // Track status per item
  const [items, setItems] = useState(
    selected.map(sub => ({
      id: sub.id,
      from: sub.from,
      link: sub.listUnsubscribeUrl || sub.unsubscribeLink,
      status: "pending",  // "pending" | "processing" | "success" | "failed"
    }))
  );

  useEffect(() => {
    let isMounted = true;

    async function processUnsub(item) {
      // 1) GET with redirects
      let res = null;
      try {
        res = await fetch(item.link, { method: "GET", redirect: "follow" });
      } catch {
        res = null;
      }

      // 2) If HTML page with form, auto-submit
      if (res && res.headers.get("content-type")?.includes("text/html")) {
        try {
          const text = await res.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, "text/html");
          const form = doc.querySelector("form");
          if (form) {
            const action = form.action || item.link;
            const formData = new FormData();
            form.querySelectorAll("input[name]").forEach(inp => {
              formData.append(inp.name, (inp.value || "").toString());
            });
            const method = (form.method || "POST").toUpperCase();
            res = await fetch(action, {
              method,
              body: formData,
              redirect: "follow"
            });
          }
        } catch {
          // ignore form parse errors
        }
      }

      return res;
    }

    async function runAll() {
      // Load Gmail access token
      const accessToken = await getAccessToken();

      await Promise.all(
        items.map(async (item, idx) => {
          if (!isMounted) return;

          // mark processing
          setItems(prev => {
            const copy = [...prev];
            copy[idx].status = "processing";
            return copy;
          });

          let res = await processUnsub(item);
          let success = res?.ok === true;

          // Fallback: create Gmail filter if GET/POST didn't succeed
          if (!success && accessToken) {
            try {
              const installed = await createUnsubscribeFilter(item.from, accessToken);
              success = installed;
            } catch {
              success = false;
            }
          }

          if (!isMounted) return;
          setItems(prev => {
            const copy = [...prev];
            copy[idx].status = success ? "success" : "failed";
            return copy;
          });
        })
      );
    }

    runAll();

    return () => {
      isMounted = false;
    };
  }, [items.length]);

  const allDone = items.every(i => i.status === "success" || i.status === "failed");

  return (
    <div className="h-100 d-flex flex-column bg-white p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="h5 fw-bold text-dark">Unsubscribing</h2>
        <p className="small text-muted mb-0">
          Please wait while we process your request
        </p>
      </div>

      {/* Unsubscribe items list */}
      <div className="flex-grow-1 overflow-auto">
        {items.map(item => (
          <div key={item.id} className="d-flex align-items-center mb-3">
            <div className="me-3 flex-shrink-0" style={{ width: "24px", height: "24px" }}>
              {item.status === "processing" && (
                <RefreshCw
                  size={16}
                  className="text-primary spinner-border spinner-border-sm"
                />
              )}
              {item.status === "success" && <Check size={16} className="text-success" />}
              {item.status === "failed" && <X size={16} className="text-warning" />}
            </div>
            <div>
              <p className="mb-0 fw-medium">{item.from}</p>
              <p className="mb-0 small text-muted">
                {item.status === "processing" && "Processing..."}
                {item.status === "success" && "Successfully unsubscribed"}
                {item.status === "failed" && "Manual action required"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Back button */}
      {allDone && (
        <button
          onClick={toDashboard}
          className="btn btn-primary w-100 fw-medium mt-3"
        >
          Back to Dashboard
        </button>
      )}
    </div>
  );
}


// // src/screens/UnsubscribeProcess.jsx

// import React, { useState, useEffect } from "react";
// import { RefreshCw, Check, X } from "lucide-react";
// import { useAppNavigation } from "../components/Navigation";
// import { useLocation } from "react-router-dom";
// import { getStoredTokens }    from "../auth/gmailAuth";
// import { createUnsubscribeFilter } from "../services/gmailApi";

// export default function UnsubscribeProcess() {
//   const { toDashboard } = useAppNavigation();
//   const location = useLocation();

//   // Incoming: array of { id, from, unsubscribeLink, listUnsubscribeHeader? }
//   const selected = location.state?.subscriptions || [];

//   // Initialize items with both possible URLs
//   const [items, setItems] = useState(
//     selected.map(sub => {
//       // try parse List-Unsubscribe header if we stored it
//       const headerUrl = sub.listUnsubscribeUrl; 
//       return {
//         id: sub.id,
//         from: sub.from,
//         // prefer headerUrl if exists, otherwise the body link
//         link: headerUrl || sub.unsubscribeLink,
//         status: "pending",  // pending | processing | success | failed
//       };
//     })
//   );

//   useEffect(() => {
//     let isMounted = true;

//     // helper to handle a single unsubscribe URL
//     async function processUnsub(item) {
//       // 1. GET with redirects
//       const res = await fetch(item.link, { method: "GET", redirect: "follow" }).catch(() => null);
//       // 2. if HTML form detected, auto-submit it
//       if (res && res.headers.get("content-type")?.includes("text/html")) {
//         const text = await res.text();
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(text, "text/html");
//         const form = doc.querySelector("form");
//         if (form) {
//           const action = form.action || item.link;
//           const formData = new FormData();
//           form.querySelectorAll("input[name]").forEach(inp => {
//             formData.append(inp.name, inp.value);
//           });
//           const method = (form.method || "POST").toUpperCase();
//           return await fetch(action, { method, body: formData, redirect: "follow" }).catch(() => null);
//         }
//       }
//       return res;
//     }

//     // kick off all in parallel
//     const promises = items.map((item, idx) =>
//       (async () => {
//         if (!isMounted) return;
//         // mark processing
//         setItems(prev => {
//           const c = [...prev];
//           c[idx].status = "processing";
//           return c;
//         });

//         // run
//         const result = await processUnsub(item);
//         const ok = result?.ok;

//         if (!isMounted) return;
//         setItems(prev => {
//           const c = [...prev];
//           c[idx].status = ok ? "success" : "failed";
//           return c;
//         });
//       })()
//     );

//     // once all done, allow back button
//     Promise.all(promises).finally(() => {
//       isMounted && setItems(prev => [...prev]); // trigger final render
//     });

//     return () => {
//       isMounted = false;
//     };
//   }, [items.length]);

//   const allDone = items.every(i => i.status === "success" || i.status === "failed");

//   return (
//     <div className="h-100 d-flex flex-column bg-white p-4">
//       {/* Header */}
//       <div className="mb-4">
//         <h2 className="h5 fw-bold text-dark">Unsubscribing</h2>
//         <p className="small text-muted mb-0">
//           Please wait while we process your request
//         </p>
//       </div>

//       {/* List */}
//       <div className="flex-grow-1 overflow-auto">
//         {items.map(item => (
//           <div key={item.id} className="d-flex align-items-center mb-3">
//             <div className="me-3">
//               {item.status === "processing" && (
//                 <RefreshCw
//                   size={16}
//                   className="text-primary spinner-border spinner-border-sm"
//                 />
//               )}
//               {item.status === "success" && <Check size={16} className="text-success" />}
//               {item.status === "failed" && <X size={16} className="text-warning" />}
//             </div>
//             <div>
//               <p className="mb-0 fw-medium">{item.from}</p>
//               <p className="mb-0 small text-muted">
//                 {item.status === "processing" && "Processing..."}
//                 {item.status === "success" && "Successfully unsubscribed"}
//                 {item.status === "failed" && "Manual action required"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Back */}
//       {allDone && (
//         <button
//           onClick={toDashboard}
//           className="btn btn-primary w-100 fw-medium mt-3"
//         >
//           Back to Dashboard
//         </button>
//       )}
//     </div>
//   );
// }

