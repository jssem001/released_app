// // src/screens/UnsubscribeProcess.jsx
import React, { useState, useEffect } from "react";
import { RefreshCw, Check, X } from "lucide-react";
import { useAppNavigation } from "../components/Navigation";
import { useLocation } from "react-router-dom";
import { getAccessToken } from "../auth/gmailAuth";
import { createUnsubscribeFilter, listFilters } from "../services/gmailApi";
import axios from "axios";

export default function UnsubscribeProcess() {
  const { toDashboard } = useAppNavigation();
  const location = useLocation();

  const selected = location.state?.subscriptions || [];

  const [items, setItems] = useState(
    selected.map(sub => ({
      id: sub.id,
      from: sub.from,
      link: sub.listUnsubscribeUrl || sub.unsubscribeLink,
      status: "pending",
    }))
  );

  useEffect(() => {
    let isMounted = true;

    async function processUnsub(item) {
      let res = null;
      try {
        res = await fetch(item.link, { method: "GET", redirect: "follow" });
      } catch {
        res = null;
      }

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
          // ignore
        }
      }

      return res;
    }

    async function runAll() {
      const accessToken = await getAccessToken();

      await Promise.all(
        items.map(async (item, idx) => {
          if (!isMounted) return;

          setItems(prev => {
            const copy = [...prev];
            copy[idx].status = "processing";
            return copy;
          });

          let res = await processUnsub(item);
          let success = res?.ok === true;

          if (!success && accessToken) {
            try {
              const installed = await createUnsubscribeFilter(item.from, accessToken);
              success = installed;
            } catch {
              success = false;
            }
          }

          // If *either* web‐GET/form succeeded OR fallback succeeded, let’s delete in our DB
          if (success) {
            try {
              const jwt = localStorage.getItem("jwt");
              await axios.delete(
                `http://localhost:5000/subscriptions/${item.id}`,
                { headers: { Authorization: `Bearer ${jwt}` } }
              );
              console.log(`🗑️ Deleted subscription ${item.id} from DB`);
            } catch (deleteErr) {
              console.warn(`Failed to delete subscription ${item.id}:`, deleteErr);
            }
          }

          if (!isMounted) return;

          setItems(prev => {
            const copy = [...prev];
            copy[idx].status = success ? "success" : "failed";
            return copy;
          });

          // Log the unsubscribe action
          try {
            const jwt = localStorage.getItem("jwt");
            await axios.post(
              "http://localhost:5000/unsubscribe/log",
              {
                subscription_id: item.id,
                status: success ? "success" : "failed"
              },
              {
                headers: {
                  Authorization: `Bearer ${jwt}`
                }
              }
            );
          } catch (e) {
            console.warn("⚠️ Failed to log unsubscribe action", e);
          }
        })
      );

      try {
        const filters = await listFilters(accessToken);
        console.log("⚙️ Gmail filters now installed:", filters);
      } catch (err) {
        console.warn("Could not list filters:", err);
      }
    }

    runAll();

    return () => {
      isMounted = false;
    };
  }, [items.length]);

  const allDone = items.every(i => i.status === "success" || i.status === "failed");

  return (
    <div className="h-100 d-flex flex-column bg-white p-4">
      <div className="mb-4">
        <h2 className="h5 fw-bold text-dark">Unsubscribing</h2>
        <p className="small text-muted mb-0">
          Please wait while we process your request
        </p>
      </div>

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




// import React, { useState, useEffect } from "react";
// import { RefreshCw, Check, X } from "lucide-react";
// import { useAppNavigation } from "../components/Navigation";
// import { useLocation } from "react-router-dom";
// import { getAccessToken } from "../auth/gmailAuth";
// import { createUnsubscribeFilter, listFilters } from "../services/gmailApi";


// export default function UnsubscribeProcess() {
//   const { toDashboard } = useAppNavigation();
//   const location = useLocation();

//   // Expect: location.state.subscriptions = [{ id, from, unsubscribeLink, listUnsubscribeUrl? }, …]
//   const selected = location.state?.subscriptions || [];

//   // Track status per item
//   const [items, setItems] = useState(
//     selected.map(sub => ({
//       id: sub.id,
//       from: sub.from,
//       link: sub.listUnsubscribeUrl || sub.unsubscribeLink,
//       status: "pending",  // "pending" | "processing" | "success" | "failed"
//     }))
//   );

//   useEffect(() => {
//     let isMounted = true;

//     async function processUnsub(item) {
//       // 1) GET with redirects
//       let res = null;
//       try {
//         res = await fetch(item.link, { method: "GET", redirect: "follow" });
//       } catch {
//         res = null;
//       }

//       // 2) If HTML page with form, auto-submit
//       if (res && res.headers.get("content-type")?.includes("text/html")) {
//         try {
//           const text = await res.text();
//           const parser = new DOMParser();
//           const doc = parser.parseFromString(text, "text/html");
//           const form = doc.querySelector("form");
//           if (form) {
//             const action = form.action || item.link;
//             const formData = new FormData();
//             form.querySelectorAll("input[name]").forEach(inp => {
//               formData.append(inp.name, (inp.value || "").toString());
//             });
//             const method = (form.method || "POST").toUpperCase();
//             res = await fetch(action, {
//               method,
//               body: formData,
//               redirect: "follow"
//             });
//           }
//         } catch {
//           // ignore form parse errors
//         }
//       }

//       return res;
//     }

//     async function runAll() {
//       // Load Gmail access token
//       const accessToken = await getAccessToken();

//       await Promise.all(
//         items.map(async (item, idx) => {
//           if (!isMounted) return;

//           // mark processing
//           setItems(prev => {
//             const copy = [...prev];
//             copy[idx].status = "processing";
//             return copy;
//           });

//           let res = await processUnsub(item);
//           let success = res?.ok === true;

//           // Fallback: create Gmail filter if GET/POST didn't succeed
//           if (!success && accessToken) {
//             try {
//               const installed = await createUnsubscribeFilter(item.from, accessToken);
//               success = installed;
//             } catch {
//               success = false;
//             }
//           }

//           if (!isMounted) return;
//           setItems(prev => {
//             const copy = [...prev];
//             copy[idx].status = success ? "success" : "failed";
//             return copy;
//           });
//         })
//       );
//             // VERIFY: list the Gmail filters you just created
//       try {
//           const accessToken = await getAccessToken();
//           const filters = await listFilters(accessToken);
//           console.log("⚙️ Gmail filters now installed:", filters);
//         } catch (err) {
//           console.warn("Could not list filters:", err);
//         }
//     }

//     runAll();

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

//       {/* Unsubscribe items list */}
//       <div className="flex-grow-1 overflow-auto">
//         {items.map(item => (
//           <div key={item.id} className="d-flex align-items-center mb-3">
//             <div className="me-3 flex-shrink-0" style={{ width: "24px", height: "24px" }}>
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

//       {/* Back button */}
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
