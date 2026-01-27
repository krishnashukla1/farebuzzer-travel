

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


        //       api.get("/email/inbox/live?limit=100"), // Add limit
        // api.get("/email/inbox/sent?limit=100"),
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

  // const getEmailDisplayInfo = (email) => {
  //   if (email.source === 'crm') {
  //     return {
  //       from: email.from || email.sender || 'CRM System',
  //       fromEmail: email.fromEmail || email.from || email.sender || 'CRM System',
  //       subject: email.subject || 'No Subject',
  //       body: email.html || email.text || email.body || 'No content',
  //     };
  //   }

  //   return {
  //     from: email.from || 'Unknown',
  //     fromEmail: email.fromEmail || email.from || 'Unknown',
  //     subject: email.subject || 'No Subject',
  //     body: email.html || email.text || 'No content',
  //   };
  // };



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
const generateContentFromMeta = (meta, emailType) => {
  let content = '';
  
  switch(emailType) {
    case 'flight_cancellation':
      content = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Flight Cancellation Details</h2>
          <p><strong>Customer:</strong> ${meta.customerName || 'N/A'}</p>
          <p><strong>Booking Reference:</strong> ${meta.confirmationNumber || 'N/A'}</p>
          <p><strong>Airline:</strong> ${meta.airline || 'N/A'}</p>
          <p><strong>Cancellation Date:</strong> ${meta.cancellationDate || 'N/A'}</p>
          ${meta.refundAmount ? `<p><strong>Refund Amount:</strong> $${meta.refundAmount}</p>` : ''}
          ${meta.customMessage ? `<p><strong>Notes:</strong> ${meta.customMessage}</p>` : ''}
        </div>
      `;
      break;
      
    case 'new_reservation':
    case 'flight_confirmation':
      content = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Flight Booking Details</h2>
          <p><strong>Customer:</strong> ${meta.customerName || 'N/A'}</p>
          <p><strong>Booking Reference:</strong> ${meta.confirmationNumber || 'N/A'}</p>
          <p><strong>Airline:</strong> ${meta.airline || 'N/A'}</p>
          <p><strong>Flight:</strong> ${meta.departure || 'N/A'} to ${meta.arrival || 'N/A'}</p>
          <p><strong>Date:</strong> ${meta.travelDate || 'N/A'}</p>
          <p><strong>Flight Number:</strong> ${meta.flightNumber || 'N/A'}</p>
          ${meta.bookingAmount ? `<p><strong>Amount:</strong> $${meta.bookingAmount}</p>` : ''}
        </div>
      `;
      break;
      
    case 'holiday_package':
      content = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Holiday Package Details</h2>
          <p><strong>Customer:</strong> ${meta.customerName || 'N/A'}</p>
          <p><strong>Package:</strong> ${meta.packageName || 'N/A'}</p>
          <p><strong>Duration:</strong> ${meta.packageNights || 'N/A'} nights</p>
          ${meta.packagePrice ? `<p><strong>Price:</strong> $${meta.packagePrice}</p>` : ''}
          ${meta.hotelName ? `<p><strong>Hotel:</strong> ${meta.hotelName}</p>` : ''}
        </div>
      `;
      break;
      
    default:
      // Generic template for other email types
      content = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Email Details</h2>
          <p><strong>Type:</strong> ${emailType.replace(/_/g, ' ')}</p>
          <p><strong>Customer:</strong> ${meta.customerName || 'N/A'}</p>
          ${meta.confirmationNumber ? `<p><strong>Reference:</strong> ${meta.confirmationNumber}</p>` : ''}
          ${Object.entries(meta)
            .filter(([key, value]) => !['customerName', 'confirmationNumber'].includes(key) && value)
            .map(([key, value]) => `<p><strong>${formatKey(key)}:</strong> ${value}</p>`)
            .join('')}
        </div>
      `;
  }
  
  return content;
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

