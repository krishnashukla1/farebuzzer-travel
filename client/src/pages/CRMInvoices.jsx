// import React, { useState, useEffect } from "react";
// import API from "../api/axios";

// const CRMInvoices = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [filter, setFilter] = useState("ALL"); // ALL, UNPAID, PAID
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchInvoices();
//   }, [filter]);

//   const fetchInvoices = async () => {
//     try {
//       setLoading(true);
//       let url = "/invoices";
//       if (filter !== "ALL") {
//         url += `?status=${filter}`;
//       }
      
//       const response = await API.get(url);
//       setInvoices(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching invoices:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       UNPAID: <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">🟡 Unpaid</span>,
//       PAID: <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">🟢 Paid</span>,
//       PARTIAL: <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">🔵 Partial</span>,
//       CANCELLED: <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">🔴 Cancelled</span>
//     };
//     return badges[status] || badges.UNPAID;
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
//         <div className="flex gap-2">
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border rounded-lg px-4 py-2"
//           >
//             <option value="ALL">All Invoices</option>
//             <option value="UNPAID">Unpaid Only</option>
//             <option value="PAID">Paid Only</option>
//           </select>
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-center py-10">Loading invoices...</div>
//       ) : invoices.length === 0 ? (
//         <div className="text-center py-10 text-gray-500">No invoices found</div>
//       ) : (
//         <div className="bg-white rounded-xl shadow overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="p-4 text-left">Invoice #</th>
//                 <th className="p-4 text-left">Customer</th>
//                 <th className="p-4 text-left">Date</th>
//                 <th className="p-4 text-left">Amount</th>
//                 <th className="p-4 text-left">Status</th>
//                 <th className="p-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoices.map((invoice) => (
//                 <tr key={invoice._id} className="border-t hover:bg-gray-50">
//                   <td className="p-4 font-medium">{invoice.invoiceNumber}</td>
//                   <td className="p-4">
//                     <div>
//                       <p className="font-medium">{invoice.customerName}</p>
//                       <p className="text-sm text-gray-500">{invoice.customerEmail}</p>
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     {new Date(invoice.invoiceDate).toLocaleDateString()}
//                   </td>
//                   <td className="p-4 font-bold">${invoice.amount}</td>
//                   <td className="p-4">{getStatusBadge(invoice.paymentStatus)}</td>
//                   <td className="p-4">
//                     <div className="flex gap-2">
//                       <a
//                         href={`/invoice/${invoice.invoiceNumber}`}
//                         target="_blank"
//                         className="text-blue-600 hover:text-blue-800 cursor-pointer"
//                       >
//                         View
//                       </a>
//                       {invoice.paymentStatus === "UNPAID" && (
//                         <>
//                           <a
//                             href={`mailto:${invoice.customerEmail}?subject=Invoice ${invoice.invoiceNumber}&body=Dear ${invoice.customerName},%0D%0A%0D%0APlease find your invoice attached.%0D%0A%0D%0AInvoice Number: ${invoice.invoiceNumber}%0D%0AAmount: $${invoice.amount}%0D%0ADue Date: ${new Date(invoice.dueDate).toLocaleDateString()}%0D%0A%0D%0APay here: ${window.location.origin}/invoice/${invoice.invoiceNumber}%0D%0A%0D%0ARegards,%0D%0AFareBuzzer Team`}
//                             className="text-green-600 hover:text-green-800 cursor-pointer"
//                           >
//                             Remind
//                           </a>
//                           <button
//                             onClick={() => markAsPaid(invoice.invoiceNumber)}
//                             className="text-purple-600 hover:text-purple-800 cursor-pointer"
//                           >
//                             Mark Paid
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CRMInvoices;

//===

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const CRMInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, [filter]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/invoices?status=${filter !== "ALL" ? filter : ""}`);
      setInvoices(response.data.data || []);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      UNPAID: <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">🟡 Unpaid</span>,
      PAID: <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">🟢 Paid</span>,
      PARTIAL: <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">🔵 Partial</span>,
      CANCELLED: <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">🔴 Cancelled</span>
    };
    return badges[status] || badges.UNPAID;
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      invoice.invoiceNumber.toLowerCase().includes(term) ||
      invoice.customerName.toLowerCase().includes(term) ||
      invoice.customerEmail.toLowerCase().includes(term) ||
      (invoice.bookingRef && invoice.bookingRef.toLowerCase().includes(term))
    );
  });

  const markAsPaid = async (invoiceNumber) => {
    if (window.confirm(`Mark invoice ${invoiceNumber} as paid?`)) {
      try {
        await API.patch(`/invoices/${invoiceNumber}/payment`, {
          paymentStatus: "PAID",
          paymentMethod: "Manual",
          transactionId: `MANUAL-${Date.now()}`
        });
        fetchInvoices();
      } catch (error) {
        alert("Failed to update invoice");
      }
    }
  };

  const getTotal = (status) => {
    return invoices
      .filter(inv => status === "ALL" || inv.paymentStatus === status)
      .reduce((sum, inv) => sum + inv.amount, 0)
      .toFixed(2);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
          <p className="text-gray-600">Manage customer invoices and payments</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <p className="text-gray-500 text-sm">Total Invoices</p>
          <p className="text-2xl font-bold">{invoices.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <p className="text-gray-500 text-sm">Unpaid Amount</p>
          <p className="text-2xl font-bold text-yellow-600">${getTotal("UNPAID")}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <p className="text-gray-500 text-sm">Paid Amount</p>
          <p className="text-2xl font-bold text-green-600">${getTotal("PAID")}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-blue-600">${getTotal("ALL")}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search invoices..."
              className="w-full border rounded-lg px-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="ALL">All Invoices</option>
            <option value="UNPAID">Unpaid Only</option>
            <option value="PAID">Paid Only</option>
            <option value="PARTIAL">Partial</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button
            onClick={fetchInvoices}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading invoices...</p>
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg border">
          <p className="text-gray-500">No invoices found</p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-2 text-blue-600"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Invoice #</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice._id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">
                      <a 
                        href={`/invoice/${invoice.invoiceNumber}`} 
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {invoice.invoiceNumber}
                      </a>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{invoice.customerName}</p>
                        <p className="text-sm text-gray-500">{invoice.customerEmail}</p>
                        {invoice.bookingRef && (
                          <p className="text-xs text-gray-400">Ref: {invoice.bookingRef}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {new Date(invoice.invoiceDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold">${invoice.amount}</td>
                    <td className="p-4">{getStatusBadge(invoice.paymentStatus)}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <a
                          href={`/invoice/${invoice.invoiceNumber}`}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
                        >
                          View
                        </a>
                        {invoice.paymentStatus === "UNPAID" && (
                          <>
                            <a
                              href={`mailto:${invoice.customerEmail}?subject=Payment Reminder - Invoice ${invoice.invoiceNumber}&body=Dear ${invoice.customerName},%0D%0A%0D%0AThis is a reminder for invoice ${invoice.invoiceNumber} of amount $${invoice.amount}.%0D%0A%0D%0APlease pay here: ${window.location.origin}/invoice/${invoice.invoiceNumber}%0D%0A%0D%0ARegards,%0D%0AFareBuzzer Team`}
                              className="text-yellow-600 hover:text-yellow-800 px-2 py-1 rounded hover:bg-yellow-50"
                            >
                              Remind
                            </a>
                            <button
                              onClick={() => markAsPaid(invoice.invoiceNumber)}
                              className="text-green-600 hover:text-green-800 px-2 py-1 rounded hover:bg-green-50"
                            >
                              Mark Paid
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMInvoices;