

import { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import { Mail, MailOpen, X, Search, ChevronLeft, ChevronRight } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function InboxEmail() {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage] = useState(15);
  const [activeTab, setActiveTab] = useState("all"); // all, unread, sent

  const fetchAllEmails = async () => {
    try {
      setLoading(true);
      const [inboxRes, sentRes] = await Promise.all([
        api.get("/email/inbox/live"),
        api.get("/email/inbox/sent"),
      ]);

      const inboxEmails = inboxRes.data.data.map(email => ({
        ...email,
        source: 'gmail',
        fromEmail: email.from,
        // Extract email from "Name <email@domain.com>" format
        from: email.from ? email.from.replace(/.*<([^>]+)>/, '$1') : 'Unknown',
      }));

      const sentEmails = sentRes.data.data.map(email => ({
        ...email,
        source: 'crm',
        fromEmail: email.from || email.sender || 'CRM System',
        from: email.from || email.sender || 'CRM System',
        // Ensure date field exists
        date: email.date || email.createdAt || email.sentAt,
      }));

      const combined = [...inboxEmails, ...sentEmails];

      combined.sort(
        (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
      );

      setEmails(combined);
      setFilteredEmails(combined);
    } catch (err) {
      console.error("Failed to load emails:", err);
      alert("Failed to load emails. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmails();
  }, []);

  // Filter emails based on search query and active tab
  useEffect(() => {
    let result = emails;

    // Apply tab filter
    if (activeTab === "unread") {
      result = result.filter(email => !email.isRead);
    } else if (activeTab === "sent") {
      result = result.filter(email => email.source === 'crm');
    } else if (activeTab === "inbox") {
      result = result.filter(email => email.source === 'gmail');
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(email =>
        (email.subject && email.subject.toLowerCase().includes(query)) ||
        (email.from && email.from.toLowerCase().includes(query)) ||
        (email.text && email.text.toLowerCase().includes(query)) ||
        (email.html && email.html.toLowerCase().includes(query)) ||
        (email.to && email.to.toLowerCase().includes(query))
      );
    }

    setFilteredEmails(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, activeTab, emails]);

  // Pagination calculations
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = filteredEmails.slice(indexOfFirstEmail, indexOfLastEmail);
  const totalPages = Math.ceil(filteredEmails.length / emailsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    // Mark as read if it's from inbox and unread
    if (email.source === 'gmail' && !email.isRead) {
      setEmails(prev =>
        prev.map(e =>
          e.id === email.id || e._id === email._id
            ? { ...e, isRead: true }
            : e
        )
      );
    }
  };

const getEmailDisplayInfo = (email) => {
  console.log("Email data:", email); // Debug log
  
  if (email.source === 'crm') {
    // Generate content from meta data if no html/text exists
    let bodyContent;
    
    if (email.html || email.text || email.body || email.content || email.message) {
      bodyContent = email.html || email.text || email.body || email.content || email.message;
    } else if (email.meta) {
      // Generate a readable summary from meta data
      bodyContent = generateContentFromMeta(email.meta, email.emailType);
    } else {
      bodyContent = 'No content';
    }
    
    return {
      from: email.from || email.sender || 'CRM System',
      fromEmail: email.fromEmail || email.from || email.sender || 'CRM System',
      subject: email.subject || 'No Subject',
      body: bodyContent,
    };
  }
  
  return {
    from: email.from || 'Unknown',
    fromEmail: email.fromEmail || email.from || 'Unknown',
    subject: email.subject || 'No Subject',
    body: email.html || email.text || 'No content',
  };
};

// Helper function to generate content from meta
// const generateContentFromMeta = (meta, emailType) => {
//   let content = '';
  
//   switch(emailType) {
//     case 'flight_cancellation':
//       content = `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2>Flight Cancellation Details</h2>
//           <p><strong>Customer:</strong> ${meta.customerName || 'N/A'}</p>
//           <p><strong>Booking Reference:</strong> ${meta.confirmationNumber || 'N/A'}</p>
//           <p><strong>Airline:</strong> ${meta.airline || 'N/A'}</p>
//           <p><strong>Cancellation Date:</strong> ${meta.cancellationDate || 'N/A'}</p>
//           ${meta.refundAmount ? `<p><strong>Refund Amount:</strong> $${meta.refundAmount}</p>` : ''}
//           ${meta.customMessage ? `<p><strong>Notes:</strong> ${meta.customMessage}</p>` : ''}
//         </div>
//       `;
//       break;
      
//     case 'new_reservation':
//     case 'flight_confirmation':
//       content = `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2>Flight Booking Details</h2>
//           <p><strong>Customer:</strong> ${meta.customerName || 'N/A'}</p>
//           <p><strong>Booking Reference:</strong> ${meta.confirmationNumber || 'N/A'}</p>
//           <p><strong>Airline:</strong> ${meta.airline || 'N/A'}</p>
//           <p><strong>Flight:</strong> ${meta.departure || 'N/A'} to ${meta.arrival || 'N/A'}</p>
//           <p><strong>Date:</strong> ${meta.travelDate || 'N/A'}</p>
//           <p><strong>Flight Number:</strong> ${meta.flightNumber || 'N/A'}</p>
//           ${meta.bookingAmount ? `<p><strong>Amount:</strong> $${meta.bookingAmount}</p>` : ''}
//         </div>
//       `;
//       break;
      
//     case 'holiday_package':
//       content = `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2>Holiday Package Details</h2>
//           <p><strong>Customer:</strong> ${meta.customerName || 'N/A'}</p>
//           <p><strong>Package:</strong> ${meta.packageName || 'N/A'}</p>
//           <p><strong>Duration:</strong> ${meta.packageNights || 'N/A'} nights</p>
//           ${meta.packagePrice ? `<p><strong>Price:</strong> $${meta.packagePrice}</p>` : ''}
//           ${meta.hotelName ? `<p><strong>Hotel:</strong> ${meta.hotelName}</p>` : ''}
//         </div>
//       `;
//       break;
      
//     default:
//       // Generic template for other email types
//       content = `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2>Email Details</h2>
//           <p><strong>Type:</strong> ${emailType.replace(/_/g, ' ')}</p>
//           <p><strong>Customer:</strong> ${meta.customerName || 'N/A'}</p>
//           ${meta.confirmationNumber ? `<p><strong>Reference:</strong> ${meta.confirmationNumber}</p>` : ''}
//           ${Object.entries(meta)
//             .filter(([key, value]) => !['customerName', 'confirmationNumber'].includes(key) && value)
//             .map(([key, value]) => `<p><strong>${formatKey(key)}:</strong> ${value}</p>`)
//             .join('')}
//         </div>
//       `;
//   }
  
//   return content;
// };




// const generateContentFromMeta = (meta, emailType) => {
//   let title = "Email Details";
//   let items = [];

//   // Helper to add key-value safely
//   const addItem = (label, value) => {
//     if (value) items.push({ label, value });
//   };

//   switch (emailType) {
//     case "flight_cancellation":
//       title = "Flight Cancellation Details";
//       addItem("Customer", meta.customerName);
//       addItem("Booking Reference", meta.confirmationNumber);
//       addItem("Airline", meta.airline);
//       addItem("Cancellation Date", meta.cancellationDate);
//       if (meta.refundAmount) addItem("Refund Amount", `$${meta.refundAmount}`);
//       if (meta.customMessage) addItem("Notes", meta.customMessage);
//       break;

//     case "new_reservation":
//     case "flight_confirmation":
//       title = "Flight Booking Details";
//       addItem("Customer", meta.customerName);
//       addItem("Booking Reference", meta.confirmationNumber);
//       addItem("Airline", meta.airline);
//       addItem("Flight", meta.departure ? `${meta.departure} to ${meta.arrival || "N/A"}` : "N/A");
//       addItem("Date", meta.travelDate);
//       addItem("Flight Number", meta.flightNumber || "N/A");
//       if (meta.bookingAmount) addItem("Amount", `$${meta.bookingAmount}`);
//       break;

//     case "holiday_package":
//       title = "Holiday Package Details";
//       addItem("Customer", meta.customerName);
//       addItem("Package", meta.packageName);
//       addItem("Duration", meta.packageNights ? `${meta.packageNights} nights` : null);
//       if (meta.packagePrice) addItem("Price", `$${meta.packagePrice}`);
//       addItem("Hotel", meta.hotelName);
//       break;

//     default:
//       title = `${emailType.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())} Details`;
//       addItem("Customer", meta.customerName);
//       if (meta.confirmationNumber) addItem("Reference", meta.confirmationNumber);

//       // Add remaining fields dynamically
//       Object.entries(meta)
//         .filter(([key]) => !["customerName", "confirmationNumber"].includes(key))
//         .forEach(([key, value]) => {
//           if (value) addItem(formatKey(key), value);
//         });
//       break;
//   }

//   // Build compact, stylish HTML
//   // const rows = items
//   //   .map(
//   //     ({ label, value }) => `
//   //       <div style="display: flex; align-items: baseline; margin: 6px 0; line-height: 1.4; font-size: 14px;">
//   //         <div style="width: 160px; min-width: 140px; font-weight: 600; color: #374151; text-align: right; padding-right: 12px;">
//   //           ${label}:
//   //         </div>
//   //         <div style="flex: 1; color: #1f2937;">
//   //           ${value || "—"}
//   //         </div>
//   //       </div>
//   //     `
//   //   )
//   //   .join("");

//   // return `
//   //   <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 16px 20px; color: #111827;">
//   //     <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; color: #1e40af;">
//   //       ${title}
//   //     </h2>
//   //     <div style="border-top: 1px solid #e5e7eb; padding-top: 12px;">
//   //       ${rows || '<p style="color:#6b7280; font-style:italic;">No details available</p>'}
//   //     </div>
//   //   </div>
//   // `;


//   // const rows = items
//   //   .map(
//   //     ({ label, value }) => `
//   //       <div style="display: grid; grid-template-columns: 160px 1fr; gap: 12px; padding: 6px 0; border-bottom: 1px solid #f3f4f6;">
//   //         <div style="font-weight: 600; color: #374151; text-align: right;">
//   //           ${label}:
//   //         </div>
//   //         <div style="color: #111827;">
//   //           ${value || "—"}
//   //         </div>
//   //       </div>
//   //     `
//   //   )
//   //   .join("");

//   // return `
//   //   <div style="font-family: system-ui, sans-serif; padding: 16px; max-width: 580px; margin: 0 auto; color: #111;">
//   //     <h2 style="margin: 0 0 14px; font-size: 19px; font-weight: 700; color: #1d4ed8;">
//   //       ${title}
//   //     </h2>
//   //     <div style="font-size: 14px; line-height: 1.35;">
//   //       ${rows || '<div style="color:#6b7280;">No additional information</div>'}
//   //     </div>
//   //   </div>
//   // `;


//   const rows = items.map(({ label, value }) => `
//     <div style="display:flex; margin:4px 0; line-height:1.32; font-size:14px;">
//       <div style="width:140px; font-weight:600; color:#444; text-align:right; padding-right:12px; flex-shrink:0;">
//         ${label}:
//       </div>
//       <div style="flex:1; color:#222;">
//         ${value || '—'}
//       </div>
//     </div>
//   `).join('');

//   return `
//     <div style="font-family:system-ui, sans-serif; padding:12px 16px; color:#111;">
//       <h2 style="margin:0 0 10px; font-size:18px; font-weight:700; color:#1d4ed8;">
//         ${title}
//       </h2>
//       <div style="font-size:14px;">
//         ${rows || '<div style="color:#666; font-style:italic;">No details available</div>'}
//       </div>
//     </div>
//   `;
  
// };




// const generateContentFromMeta = (meta, emailType) => {
//   let title = "Details";
//   let parts = [];

//   const add = (label, value) => {
//     if (value !== undefined && value !== null && value !== '') {
//       parts.push(`<strong>${label}:</strong> ${value}`);
//     }
//   };

//   switch (emailType) {
//     case 'flight_cancellation':
//       title = "Flight Cancellation";
//       add("Customer", meta.customerName);
//       add("Booking Reference", meta.confirmationNumber);
//       add("Airline", meta.airline);
//       add("Cancellation Date", meta.cancellationDate);
//       add("Refund Amount", meta.refundAmount ? `$${meta.refundAmount}` : null);
//       add("Notes", meta.customMessage);
//       break;

//     case 'new_reservation':
//     case 'flight_confirmation':
//       title = "Flight Booking";
//       add("Customer", meta.customerName);
//       add("Booking Reference", meta.confirmationNumber);
//       add("Airline", meta.airline);
//       add("Flight", meta.departure && meta.arrival 
//         ? `${meta.departure} to ${meta.arrival}` 
//         : (meta.departure || meta.arrival || '—'));
//       add("Date", meta.travelDate);
//       add("Flight Number", meta.flightNumber || '—');
//       add("Amount", meta.bookingAmount ? `$${meta.bookingAmount}` : null);
//       break;

//     case 'holiday_package':
//       title = "Holiday Package";
//       add("Customer", meta.customerName);
//       add("Package", meta.packageName);
//       add("Duration", meta.packageNights ? `${meta.packageNights} nights` : null);
//       add("Price", meta.packagePrice ? `$${meta.packagePrice}` : null);
//       add("Hotel", meta.hotelName);
//       break;

//     default:
//       title = emailType.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
//       add("Customer", meta.customerName);
//       add("Reference", meta.confirmationNumber);

//       Object.entries(meta)
//         .filter(([k]) => !['customerName', 'confirmationNumber'].includes(k))
//         .forEach(([key, val]) => {
//           if (val) add(formatKey(key), val);
//         });
//       break;
//   }

//   // ────────────────────────────────────────────────
//   //   Very compact layout – one line or wrapped naturally
//   // ────────────────────────────────────────────────

//   return `
//     <div style="
//       font-family: system-ui, -apple-system, sans-serif;
//       padding: 12px 16px;
//       font-size: 14px;
//       line-height: 1.38;
//       color: #111827;
//     ">
//       <div style="
//         font-size: 17px;
//         font-weight: 700;
//         color: #1d4ed8;
//         margin-bottom: 8px;
//       ">
//         ${title}
//       </div>

//       <div style="
//         color: #1f2937;
//         word-wrap: break-word;
//       ">
//         ${parts.length > 0 
//           ? parts.join('  &nbsp;&nbsp;  ') 
//           : '<em style="color:#6b7280;">No details available</em>'}
//       </div>
//     </div>
//   `;
// };


const generateContentFromMeta = (meta, emailType) => {
  let title = "Details";
  let fields = [];

  const add = (label, value) => {
    if (value !== undefined && value !== null && value !== '') {
      fields.push({ label, value });
    }
  };

  switch (emailType) {
    case 'flight_cancellation':
      title = "Flight Cancellation";
      add("Customer", meta.customerName);
      add("Booking Reference", meta.confirmationNumber);
      add("Airline", meta.airline);
      add("Cancellation Date", meta.cancellationDate);
      add("Refund Amount", meta.refundAmount ? `$${meta.refundAmount}` : null);
      add("Notes", meta.customMessage);
      break;

    case 'new_reservation':
    case 'flight_confirmation':
      title = "Flight Booking";
      add("Customer", meta.customerName);
      add("Booking Reference", meta.confirmationNumber);
      add("Airline", meta.airline);
      add("Flight", meta.departure && meta.arrival 
        ? `${meta.departure} to ${meta.arrival}` 
        : (meta.departure || meta.arrival || '—'));
      add("Date", meta.travelDate);
      // add("Flight Number", meta.flightNumber || '—');
      add("Amount", meta.bookingAmount ? `$${meta.bookingAmount}` : null);
      break;

    case 'holiday_package':
      title = "Holiday Package";
      add("Customer", meta.customerName);
      add("Package", meta.packageName);
      add("Duration", meta.packageNights ? `${meta.packageNights} nights` : null);
      add("Price", meta.packagePrice ? `$${meta.packagePrice}` : null);
      add("Hotel", meta.hotelName);
      break;

    default:
      title = emailType.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      add("Customer", meta.customerName);
      add("Reference", meta.confirmationNumber);

      Object.entries(meta)
        .filter(([k]) => !['customerName', 'confirmationNumber'].includes(k))
        .forEach(([key, val]) => {
          if (val) add(formatKey(key), val);
        });
      break;
  }

  // ────────────────────────────────────────────────
  //   Pair fields → 2 per line
  // ────────────────────────────────────────────────

  const pairs = [];
  for (let i = 0; i < fields.length; i += 2) {
    const first = fields[i];
    const second = fields[i + 1];

    let line = '';
    
    if (first) {
      line += `<strong>${first.label}:</strong> ${first.value}`;
    }
    
    if (second) {
      line += `  &nbsp;&nbsp;&nbsp;  <strong>${second.label}:</strong> ${second.value}`;
    }

    if (line) {
      pairs.push(line);
    }
  }

  return `
    <div style="
      font-family: system-ui, -apple-system, sans-serif;
      padding: 14px 18px;
      font-size: 14px;
      line-height: 1.45;
      color: #111827;
    ">
      <div style="
        font-size: 18px;
        font-weight: 700;
        color: #1d4ed8;
        margin-bottom: 10px;
        padding-bottom: 6px;
        border-bottom: 1px solid #e5e7eb;
      ">
        ${title}
      </div>

      <div style="
        color: #1f2937;
      ">
        ${pairs.length > 0 
          ? pairs.map(p => `<div style="margin: 6px 0;">${p}</div>`).join('')
          : '<div style="color:#6b7280; font-style:italic;">No details available</div>'}
      </div>
    </div>
  `;
};

const formatKey = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/_/g, ' ');
};


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-full mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Email Inbox</h1>
          <p className="text-gray-600 mt-1">View all incoming and outgoing emails</p>
        </header>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search emails by subject, sender, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 overflow-x-auto">
              {["all", "inbox", "sent", "unread"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${activeTab === tab
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === "unread" && emails.filter(e => !e.isRead).length > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {emails.filter(e => !e.isRead).length}
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={fetchAllEmails}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 whitespace-nowrap"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-600">Total Emails</p>
            <p className="text-2xl font-bold">{emails.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-600">Unread</p>
            <p className="text-2xl font-bold text-red-600">
              {emails.filter(e => !e.isRead).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-600">Inbox</p>
            <p className="text-2xl font-bold text-blue-600">
              {emails.filter(e => e.source === 'gmail').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-600">Sent</p>
            <p className="text-2xl font-bold text-green-600">
              {emails.filter(e => e.source === 'crm').length}
            </p>
          </div>
        </div>

        {/* Email List */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading emails...</p>
          </div>
        ) : filteredEmails.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Mail className="mx-auto text-gray-400" size={48} />
            <p className="mt-4 text-gray-600 text-lg">
              {searchQuery ? "No emails match your search." : "No emails found."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-2 text-indigo-600 hover:text-indigo-800"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              {currentEmails.map((email) => {
                const emailInfo = getEmailDisplayInfo(email);
                return (
                  <div
                    key={email.id || email._id}
                    onClick={() => handleEmailClick(email)}
                    className={`cursor-pointer border-b hover:bg-gray-50 transition-colors ${!email.isRead ? "bg-blue-50" : ""
                      }`}
                  >
                    <div className="px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {email.isRead ? (
                          <MailOpen size={20} className="text-gray-400 flex-shrink-0" />
                        ) : (
                          <Mail size={20} className="text-indigo-600 flex-shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900 truncate">
                              {emailInfo.from}
                            </p>
                            <span className={`text-xs px-2 py-1 rounded-full ${email.source === 'crm'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                              }`}>
                              {email.source === 'crm' ? 'Sent' : 'Inbox'}
                            </span>
                          </div>
                          <p className="font-medium text-gray-800 truncate">
                            {emailInfo.subject}
                          </p>
                          <p className="text-gray-600 text-sm truncate">
                            {email.text ? email.text.substring(0, 100) : emailInfo.body.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm whitespace-nowrap">
                        {formatDate(email.date || email.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white rounded-xl shadow-sm px-4 py-3">
                <div className="text-gray-600">
                  Showing {indexOfFirstEmail + 1} to {Math.min(indexOfLastEmail, filteredEmails.length)} of {filteredEmails.length} emails
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`w-10 h-10 rounded-lg ${currentPage === pageNum
                            ? "bg-indigo-600 text-white cursor-pointer"
                            : "hover:bg-gray-100 cursor-pointer"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Email Detail Modal */}
      {selectedEmail && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && setSelectedEmail(null)}
        >
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b bg-indigo-50">
              <div className="min-w-0 flex-1">
                <h2 className="font-bold truncate text-lg">
                  {getEmailDisplayInfo(selectedEmail).subject}
                </h2>
                <p className="text-gray-600 text-sm truncate">
                  From: {getEmailDisplayInfo(selectedEmail).fromEmail}
                </p>
              </div>
              <button
                onClick={() => setSelectedEmail(null)}
                className="ml-4 p-2 hover:bg-red-200 rounded-lg cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 bg-gray-50 border-b">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">From:</p>
                  <p className="font-medium">{getEmailDisplayInfo(selectedEmail).fromEmail}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date:</p>
                  <p className="font-medium">
                    {formatDate(selectedEmail.date || selectedEmail.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Source:</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${selectedEmail.source === 'crm'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                    }`}>
                    {selectedEmail.source === 'crm' ? 'Sent from CRM' : 'Received in Gmail'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div
                className="prose max-w-none break-words"
                dangerouslySetInnerHTML={{
                  __html: selectedEmail.html || `<pre>${selectedEmail.text || getEmailDisplayInfo(selectedEmail).body}</pre>`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// =========deepseek==================

// import { useEffect, useState, useMemo, useCallback } from "react";
// import api from "../api/axios";
// import { 
//   Mail, 
//   MailOpen, 
//   X, 
//   Search, 
//   ChevronLeft, 
//   ChevronRight, 
//   Filter,
//   Archive,
//   Trash2,
//   Star,
//   StarOff,
//   Clock,
//   User,
//   Calendar,
//   Paperclip,
//   RefreshCw,
//   MoreVertical,
//   Download,
//   Printer,
//   Reply,
//   Forward,
//   Eye,
//   EyeOff,
//   CheckSquare,
//   Square,
//   Inbox,
//   Send,
//   AlertCircle,
//   Info
// } from "lucide-react";

// const formatDate = (dateStr) => {
//   if (!dateStr) return "—";
//   const date = new Date(dateStr);
//   const now = new Date();
//   const diffMs = now - date;
//   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
//   if (diffDays === 0) {
//     return date.toLocaleTimeString("en-IN", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });
//   } else if (diffDays === 1) {
//     return "Yesterday";
//   } else if (diffDays < 7) {
//     return date.toLocaleDateString("en-IN", { weekday: "short" });
//   } else {
//     return date.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//     });
//   }
// };

// const getFullDate = (dateStr) => {
//   if (!dateStr) return "";
//   return new Date(dateStr).toLocaleString("en-IN", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// export default function InboxEmail() {
//   const [emails, setEmails] = useState([]);
//   const [filteredEmails, setFilteredEmails] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [selectedEmails, setSelectedEmails] = useState(new Set());
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [emailsPerPage] = useState(25);
//   const [activeTab, setActiveTab] = useState("inbox");
//   const [showFilters, setShowFilters] = useState(false);
//   const [starredOnly, setStarredOnly] = useState(false);
//   const [withAttachments, setWithAttachments] = useState(false);
//   const [unreadOnly, setUnreadOnly] = useState(false);
//   const [sortBy, setSortBy] = useState("date");
//   const [sortOrder, setSortOrder] = useState("desc");

//   const emailTabs = [
//     { id: "inbox", label: "Inbox", icon: Inbox, count: 0, color: "text-blue-600" },
//     { id: "sent", label: "Sent", icon: Send, count: 0, color: "text-green-600" },
//     { id: "starred", label: "Starred", icon: Star, count: 0, color: "text-yellow-600" },
//     { id: "unread", label: "Unread", icon: Mail, count: 0, color: "text-red-600" },
//     { id: "all", label: "All Mail", icon: Mail, count: 0, color: "text-gray-600" },
//   ];

//   const fetchAllEmails = async () => {
//     try {
//       setLoading(true);
//       const [inboxRes, sentRes] = await Promise.all([
//         api.get("/email/inbox/live"),
//         api.get("/email/inbox/sent"),
//       ]);

//       const inboxEmails = inboxRes.data.data.map(email => ({
//         ...email,
//         source: 'gmail',
//         fromEmail: email.from,
//         from: email.from ? email.from.replace(/.*<([^>]+)>/, '$1') : 'Unknown',
//         isStarred: false,
//         hasAttachment: email.attachments && email.attachments.length > 0,
//       }));

//       const sentEmails = sentRes.data.data.map(email => ({
//         ...email,
//         source: 'crm',
//         fromEmail: email.from || email.sender || 'CRM System',
//         from: email.from || email.sender || 'CRM System',
//         date: email.date || email.createdAt || email.sentAt,
//         isStarred: false,
//         hasAttachment: email.attachments && email.attachments.length > 0,
//       }));

//       const combined = [...inboxEmails, ...sentEmails];
//       setEmails(combined);
//       setFilteredEmails(combined);
//     } catch (err) {
//       console.error("Failed to load emails:", err);
//       alert("Failed to load emails. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllEmails();
//   }, []);

//   const toggleStar = (emailId) => {
//     setEmails(prev => prev.map(email => 
//       email.id === emailId || email._id === emailId 
//         ? { ...email, isStarred: !email.isStarred }
//         : email
//     ));
//   };

//   const toggleSelectEmail = (emailId) => {
//     const newSelected = new Set(selectedEmails);
//     if (newSelected.has(emailId)) {
//       newSelected.delete(emailId);
//     } else {
//       newSelected.add(emailId);
//     }
//     setSelectedEmails(newSelected);
//   };

//   const toggleSelectAll = () => {
//     if (selectedEmails.size === currentEmails.length) {
//       setSelectedEmails(new Set());
//     } else {
//       const allIds = currentEmails.map(e => e.id || e._id);
//       setSelectedEmails(new Set(allIds));
//     }
//   };

//   const handleBulkAction = (action) => {
//     // Implement bulk actions (archive, delete, mark as read/unread)
//     console.log(`${action} ${selectedEmails.size} emails`);
//     // Reset selection
//     setSelectedEmails(new Set());
//   };

//   useEffect(() => {
//     let result = emails;

//     // Apply tab filter
//     if (activeTab === "inbox") {
//       result = result.filter(email => email.source === 'gmail');
//     } else if (activeTab === "sent") {
//       result = result.filter(email => email.source === 'crm');
//     } else if (activeTab === "starred") {
//       result = result.filter(email => email.isStarred);
//     } else if (activeTab === "unread") {
//       result = result.filter(email => !email.isRead);
//     }

//     // Apply additional filters
//     if (starredOnly) {
//       result = result.filter(email => email.isStarred);
//     }
    
//     if (withAttachments) {
//       result = result.filter(email => email.hasAttachment);
//     }
    
//     if (unreadOnly) {
//       result = result.filter(email => !email.isRead);
//     }

//     // Apply search filter
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(email =>
//         (email.subject && email.subject.toLowerCase().includes(query)) ||
//         (email.from && email.from.toLowerCase().includes(query)) ||
//         (email.text && email.text.toLowerCase().includes(query)) ||
//         (email.html && email.html.toLowerCase().includes(query)) ||
//         (email.to && email.to.toLowerCase().includes(query))
//       );
//     }

//     // Apply sorting
//     result.sort((a, b) => {
//       let aValue, bValue;
      
//       switch(sortBy) {
//         case "date":
//           aValue = new Date(a.date || a.createdAt);
//           bValue = new Date(b.date || b.createdAt);
//           break;
//         case "sender":
//           aValue = a.from?.toLowerCase() || "";
//           bValue = b.from?.toLowerCase() || "";
//           break;
//         case "subject":
//           aValue = a.subject?.toLowerCase() || "";
//           bValue = b.subject?.toLowerCase() || "";
//           break;
//         default:
//           aValue = new Date(a.date || a.createdAt);
//           bValue = new Date(b.date || b.createdAt);
//       }
      
//       if (sortOrder === "asc") {
//         return aValue > bValue ? 1 : -1;
//       } else {
//         return aValue < bValue ? 1 : -1;
//       }
//     });

//     setFilteredEmails(result);
//     setCurrentPage(1);
//   }, [searchQuery, activeTab, emails, starredOnly, withAttachments, unreadOnly, sortBy, sortOrder]);

//   // Update tab counts
//   useEffect(() => {
//     const inboxCount = emails.filter(e => e.source === 'gmail').length;
//     const sentCount = emails.filter(e => e.source === 'crm').length;
//     const starredCount = emails.filter(e => e.isStarred).length;
//     const unreadCount = emails.filter(e => !e.isRead).length;
    
//     // Update tab counts in UI
//     const tabs = document.querySelectorAll('[data-tab-id]');
//     tabs.forEach(tab => {
//       const countEl = tab.querySelector('.tab-count');
//       if (countEl) {
//         const count = tab.dataset.tabId === 'inbox' ? inboxCount :
//                      tab.dataset.tabId === 'sent' ? sentCount :
//                      tab.dataset.tabId === 'starred' ? starredCount :
//                      tab.dataset.tabId === 'unread' ? unreadCount :
//                      emails.length;
//         countEl.textContent = count > 99 ? '99+' : count;
//       }
//     });
//   }, [emails]);

//   const indexOfLastEmail = currentPage * emailsPerPage;
//   const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
//   const currentEmails = filteredEmails.slice(indexOfFirstEmail, indexOfLastEmail);
//   const totalPages = Math.ceil(filteredEmails.length / emailsPerPage);

//   const paginate = (pageNumber) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return;
//     setCurrentPage(pageNumber);
//   };

//   const handleEmailClick = (email) => {
//     setSelectedEmail(email);
//     if (email.source === 'gmail' && !email.isRead) {
//       setEmails(prev =>
//         prev.map(e =>
//           e.id === email.id || e._id === email._id
//             ? { ...e, isRead: true }
//             : e
//         )
//       );
//     }
//   };

//   const getEmailDisplayInfo = (email) => {
//     if (email.source === 'crm') {
//       let bodyContent;
      
//       if (email.html || email.text || email.body) {
//         bodyContent = email.html || email.text || email.body;
//       } else if (email.meta) {
//         bodyContent = generateContentFromMeta(email.meta, email.emailType);
//       } else {
//         bodyContent = 'No content';
//       }
      
//       return {
//         from: email.from || email.sender || 'CRM System',
//         fromEmail: email.fromEmail || email.from || email.sender || 'CRM System',
//         subject: email.subject || 'No Subject',
//         body: bodyContent,
//       };
//     }
    
//     return {
//       from: email.from || 'Unknown',
//       fromEmail: email.fromEmail || email.from || 'Unknown',
//       subject: email.subject || 'No Subject',
//       body: email.html || email.text || 'No content',
//     };
//   };

//   const generateContentFromMeta = (meta, emailType) => {
//     if (!meta) return '<p>No content available</p>';
    
//     const customerInfo = `<strong>Customer:</strong> ${meta.customerName || 'N/A'}`;
//     const bookingRef = meta.confirmationNumber ? `<br/><strong>Booking Ref:</strong> ${meta.confirmationNumber}` : '';
//     const dateInfo = meta.travelDate ? `<br/><strong>Date:</strong> ${meta.travelDate}` : '';
//     const amountInfo = meta.bookingAmount ? `<br/><strong>Amount:</strong> $${meta.bookingAmount}` : '';



    
//     return `
//       <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb; border-radius: 8px;">
//         <h3 style="color: #374151; margin-bottom: 16px;">Booking Details</h3>
//         <p style="color: #4b5563; margin: 8px 0;">${customerInfo}${bookingRef}${dateInfo}${amountInfo}</p>
//       </div>
//     `;
//   };


//   const renderEmailContent = (content) => {
//     if (!content) return null;
    
//     // Create a safe HTML string
//     const safeContent = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
//     return (
//       <div 
//         className="prose max-w-none break-words"
//         dangerouslySetInnerHTML={{ __html: safeContent }}
//       />
//     );
//   };

//   const handleReply = () => {
//     if (selectedEmail) {
//       const subject = `Re: ${selectedEmail.subject}`;
//       const to = selectedEmail.source === 'crm' ? selectedEmail.to : selectedEmail.fromEmail;
//       console.log(`Reply to: ${to}, Subject: ${subject}`);
//       alert(`Reply to: ${to}`);
//     }
//   };

//   const handleForward = () => {
//     if (selectedEmail) {
//       const subject = `Fwd: ${selectedEmail.subject}`;
//       console.log(`Forward email: ${subject}`);
//       alert(`Forward email: ${subject}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                 <Mail className="text-white" size={18} />
//               </div>
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-900">Email Inbox</h1>
//                 <p className="text-gray-500 text-sm">
//                   {filteredEmails.length} emails • {emails.filter(e => !e.isRead).length} unread
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={fetchAllEmails}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 title="Refresh"
//               >
//                 <RefreshCw size={18} className="text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex h-[calc(100vh-73px)]">
//         {/* Left Sidebar */}
//         <div className="w-64 border-r bg-white hidden lg:block">
//           <div className="p-4">
//             <button
//               onClick={() => setActiveTab("compose")}
//               className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center space-x-2"
//             >
//               <Send size={18} />
//               <span>Compose</span>
//             </button>
//           </div>
          
//           <div className="px-2">
//             {emailTabs.map((tab) => {
//               const Icon = tab.icon;
//               const count = 
//                 tab.id === 'inbox' ? emails.filter(e => e.source === 'gmail').length :
//                 tab.id === 'sent' ? emails.filter(e => e.source === 'crm').length :
//                 tab.id === 'starred' ? emails.filter(e => e.isStarred).length :
//                 tab.id === 'unread' ? emails.filter(e => !e.isRead).length :
//                 emails.length;
              
//               return (
//                 <button
//                   key={tab.id}
//                   data-tab-id={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-1 transition-all ${
//                     activeTab === tab.id 
//                       ? 'bg-blue-50 text-blue-700' 
//                       : 'hover:bg-gray-50 text-gray-700'
//                   }`}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <Icon size={18} className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'} />
//                     <span className="font-medium">{tab.label}</span>
//                   </div>
//                   {count > 0 && (
//                     <span className={`text-xs font-medium px-2 py-1 rounded-full ${
//                       activeTab === tab.id 
//                         ? 'bg-blue-100 text-blue-700' 
//                         : 'bg-gray-100 text-gray-600'
//                     }`}>
//                       {count > 99 ? '99+' : count}
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Labels */}
//           <div className="mt-8 px-4">
//             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
//               Labels
//             </h3>
//             <div className="space-y-1">
//               {[
//                 { label: "Work", count: 12, color: "bg-green-500" },
//                 { label: "Personal", count: 8, color: "bg-yellow-500" },
//                 { label: "Travel", count: 23, color: "bg-purple-500" },
//                 { label: "Important", count: 5, color: "bg-red-500" },
//               ].map((item) => (
//                 <button
//                   key={item.label}
//                   className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-gray-50"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className={`w-2 h-2 rounded-full ${item.color}`} />
//                     <span className="text-sm text-gray-700">{item.label}</span>
//                   </div>
//                   <span className="text-xs text-gray-500">{item.count}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           {/* Toolbar */}
//           <div className="bg-white border-b px-6 py-4">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               {/* Search Bar */}
//               <div className="relative flex-1 max-w-2xl">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="text-gray-400" size={18} />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search emails..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={() => setSearchQuery("")}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     <X size={16} className="text-gray-400 hover:text-gray-600" />
//                   </button>
//                 )}
//               </div>

//               {/* Filters */}
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
//                     showFilters 
//                       ? 'bg-blue-50 border-blue-200 text-blue-700' 
//                       : 'border-gray-200 text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <Filter size={16} />
//                   <span className="text-sm font-medium">Filter</span>
//                 </button>
                
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700"
//                 >
//                   <option value="date">Sort by Date</option>
//                   <option value="sender">Sort by Sender</option>
//                   <option value="subject">Sort by Subject</option>
//                 </select>
                
//                 <button
//                   onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
//                   className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
//                 >
//                   {sortOrder === 'asc' ? '↑' : '↓'}
//                 </button>
//               </div>
//             </div>

//             {/* Filter Panel */}
//             {showFilters && (
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={starredOnly}
//                       onChange={(e) => setStarredOnly(e.target.checked)}
//                       className="rounded text-blue-600"
//                     />
//                     <span className="text-sm text-gray-700">Starred only</span>
//                   </label>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={withAttachments}
//                       onChange={(e) => setWithAttachments(e.target.checked)}
//                       className="rounded text-blue-600"
//                     />
//                     <span className="text-sm text-gray-700">With attachments</span>
//                   </label>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={unreadOnly}
//                       onChange={(e) => setUnreadOnly(e.target.checked)}
//                       className="rounded text-blue-600"
//                     />
//                     <span className="text-sm text-gray-700">Unread only</span>
//                   </label>
//                 </div>
//               </div>
//             )}

//             {/* Bulk Actions */}
//             {selectedEmails.size > 0 && (
//               <div className="mt-4 flex items-center space-x-2">
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => handleBulkAction('archive')}
//                     className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
//                   >
//                     Archive
//                   </button>
//                   <button
//                     onClick={() => handleBulkAction('delete')}
//                     className="px-3 py-1.5 text-sm bg-red-50 hover:bg-red-100 rounded-lg text-red-700"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => handleBulkAction('mark-read')}
//                     className="px-3 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700"
//                   >
//                     Mark as read
//                   </button>
//                 </div>
//                 <span className="text-sm text-gray-500 ml-2">
//                   {selectedEmails.size} selected
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Email List */}
//           <div className="flex-1 overflow-y-auto bg-white">
//             {loading ? (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                   <p className="mt-4 text-gray-600">Loading emails...</p>
//                 </div>
//               </div>
//             ) : filteredEmails.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full p-8 text-center">
//                 <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//                   <Mail className="text-gray-400" size={40} />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   {searchQuery ? "No matching emails" : "No emails yet"}
//                 </h3>
//                 <p className="text-gray-500 max-w-md">
//                   {searchQuery 
//                     ? "Try adjusting your search or filters to find what you're looking for."
//                     : "Emails will appear here once you receive or send them."
//                   }
//                 </p>
//                 {searchQuery && (
//                   <button
//                     onClick={() => setSearchQuery("")}
//                     className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
//                   >
//                     Clear search
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <div className="divide-y">
//                   {currentEmails.map((email) => {
//                     const emailInfo = getEmailDisplayInfo(email);
//                     const isSelected = selectedEmails.has(email.id || email._id);
//                     const emailId = email.id || email._id;
                    
//                     return (
//                       <div
//                         key={emailId}
//                         className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-all ${
//                           isSelected ? 'bg-blue-50' : ''
//                         } ${!email.isRead ? 'bg-blue-50/50' : ''}`}
//                         onClick={(e) => {
//                           if (e.target.closest('button') || e.target.closest('input')) return;
//                           handleEmailClick(email);
//                         }}
//                       >
//                         <div className="flex items-start gap-4">
//                           {/* Checkbox */}
//                           <div className="flex items-center">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 toggleSelectEmail(emailId);
//                               }}
//                               className="text-gray-400 hover:text-gray-600"
//                             >
//                               {isSelected ? (
//                                 <CheckSquare size={18} className="text-blue-600" />
//                               ) : (
//                                 <Square size={18} />
//                               )}
//                             </button>
//                           </div>

//                           {/* Star */}
//                           <div className="flex items-center">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 toggleStar(emailId);
//                               }}
//                               className="text-gray-400 hover:text-yellow-500"
//                             >
//                               {email.isStarred ? (
//                                 <Star size={18} className="fill-yellow-400 text-yellow-400" />
//                               ) : (
//                                 <StarOff size={18} />
//                               )}
//                             </button>
//                           </div>

//                           {/* Sender */}
//                           <div className="flex-shrink-0 w-32">
//                             <div className="flex items-center gap-2">
//                               <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
//                                 {emailInfo.from?.charAt(0)?.toUpperCase() || '?'}
//                               </div>
//                               <div className="min-w-0">
//                                 <p className="font-medium text-gray-900 truncate text-sm">
//                                   {emailInfo.from}
//                                 </p>
//                                 <span className={`text-xs px-1.5 py-0.5 rounded ${
//                                   email.source === 'crm'
//                                     ? 'bg-green-100 text-green-800'
//                                     : 'bg-blue-100 text-blue-800'
//                                 }`}>
//                                   {email.source === 'crm' ? 'Sent' : 'Inbox'}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Content */}
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-start justify-between mb-1">
//                               <div className="flex items-center gap-2">
//                                 <p className="font-semibold text-gray-900 truncate">
//                                   {emailInfo.subject}
//                                 </p>
//                                 {email.hasAttachment && (
//                                   <Paperclip size={14} className="text-gray-400" />
//                                 )}
//                               </div>
//                               <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
//                                 {formatDate(email.date || email.createdAt)}
//                               </span>
//                             </div>
//                             <p className="text-gray-600 text-sm truncate">
//                               {email.text ? email.text.substring(0, 120) : emailInfo.body?.substring(0, 120)}...
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="px-6 py-4 border-t bg-white">
//                     <div className="flex items-center justify-between">
//                       <div className="text-sm text-gray-600">
//                         Showing {indexOfFirstEmail + 1} to {Math.min(indexOfLastEmail, filteredEmails.length)} of {filteredEmails.length} emails
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => paginate(currentPage - 1)}
//                           disabled={currentPage === 1}
//                           className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
//                         >
//                           <ChevronLeft size={18} />
//                         </button>
                        
//                         {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                           let pageNum;
//                           if (totalPages <= 5) {
//                             pageNum = i + 1;
//                           } else if (currentPage <= 3) {
//                             pageNum = i + 1;
//                           } else if (currentPage >= totalPages - 2) {
//                             pageNum = totalPages - 4 + i;
//                           } else {
//                             pageNum = currentPage - 2 + i;
//                           }

//                           return (
//                             <button
//                               key={pageNum}
//                               onClick={() => paginate(pageNum)}
//                               className={`w-8 h-8 rounded-lg text-sm font-medium ${
//                                 currentPage === pageNum
//                                   ? "bg-blue-600 text-white"
//                                   : "hover:bg-gray-100 text-gray-700"
//                               }`}
//                             >
//                               {pageNum}
//                             </button>
//                           );
//                         })}

//                         <button
//                           onClick={() => paginate(currentPage + 1)}
//                           disabled={currentPage === totalPages}
//                           className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
//                         >
//                           <ChevronRight size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Email Detail Modal */}
//       {selectedEmail && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
//             {/* Modal Header */}
//             <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-medium">
//                     {getEmailDisplayInfo(selectedEmail).from?.charAt(0)?.toUpperCase() || '?'}
//                   </div>
//                   <div>
//                     <h2 className="font-bold text-gray-900 text-lg">
//                       {getEmailDisplayInfo(selectedEmail).subject}
//                     </h2>
//                     <div className="flex items-center space-x-2 text-sm text-gray-600">
//                       <span className="font-medium">{getEmailDisplayInfo(selectedEmail).fromEmail}</span>
//                       <span>•</span>
//                       <span>{getFullDate(selectedEmail.date || selectedEmail.createdAt)}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={handleReply}
//                     className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                     title="Reply"
//                   >
//                     <Reply size={18} className="text-gray-600" />
//                   </button>
//                   <button
//                     onClick={handleForward}
//                     className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                     title="Forward"
//                   >
//                     <Forward size={18} className="text-gray-600" />
//                   </button>
//                   <button
//                     onClick={() => toggleStar(selectedEmail.id || selectedEmail._id)}
//                     className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                     title="Star"
//                   >
//                     {selectedEmail.isStarred ? (
//                       <Star size={18} className="fill-yellow-400 text-yellow-400" />
//                     ) : (
//                       <Star size={18} className="text-gray-600" />
//                     )}
//                   </button>
//                   <button
//                     onClick={() => setSelectedEmail(null)}
//                     className="p-2 hover:bg-red-100 rounded-lg transition-colors"
//                   >
//                     <X size={18} className="text-gray-600" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Email Info Bar */}
//             <div className="px-6 py-3 border-b bg-gray-50">
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-gray-500">To:</span>
//                     <span className="font-medium">{selectedEmail.to || getEmailDisplayInfo(selectedEmail).fromEmail}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       selectedEmail.source === 'crm'
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-blue-100 text-blue-800'
//                     }`}>
//                       {selectedEmail.source === 'crm' ? 'Sent' : 'Received'}
//                     </span>
//                     {selectedEmail.hasAttachment && (
//                       <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs flex items-center gap-1">
//                         <Paperclip size={10} />
//                         Has attachment
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button className="px-3 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700">
//                     <Download size={14} className="inline mr-1" />
//                     Download
//                   </button>
//                   <button className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700">
//                     <Printer size={14} className="inline mr-1" />
//                     Print
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Email Content */}
//             <div className="flex-1 overflow-y-auto p-6">
//               <div className="prose max-w-none">
//                 {renderEmailContent(
//                   selectedEmail.html || 
//                   selectedEmail.text || 
//                   getEmailDisplayInfo(selectedEmail).body
//                 )}
//               </div>
//             </div>

//             {/* Action Footer */}
//             <div className="px-6 py-4 border-t bg-gray-50">
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={handleReply}
//                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2"
//                 >
//                   <Reply size={16} />
//                   <span>Reply</span>
//                 </button>
//                 <button
//                   onClick={handleForward}
//                   className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium flex items-center space-x-2"
//                 >
//                   <Forward size={16} />
//                   <span>Forward</span>
//                 </button>
//                 <div className="flex-1" />
//                 <button
//                   onClick={() => setSelectedEmail(null)}
//                   className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//=====================================grok
