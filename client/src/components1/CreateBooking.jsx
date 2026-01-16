// import { useState } from "react";
// import API from "../api/axios";
// import {
//   User,
//   Plane,
//   Hash,
//   IndianRupee,
//   Percent,
//   BadgeCheck,  MessageSquare
// } from "lucide-react";



// const CreateBooking = () => {
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     customerName: "",
//     pnr: "",
//     airline: "",
//     status: "FRESH",
//     amount: "",
//     commission: "",
//     mco: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (["amount", "commission", "mco"].includes(name)) {
//       setForm({ ...form, [name]: value === "" ? "" : Number(value) });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await API.post("/bookings", form);
//       alert("Booking created successfully ✅");

//       setForm({
//         customerName: "",
//         pnr: "",
//         airline: "",
//         status: "FRESH",
//         amount: "",
//         commission: "",
//         mco: "",
//       });
//     } catch {
//       alert("Failed to create booking ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-full mx-auto">
//       {/* Header */}
//       {/* <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Create New Booking</h1>
//         <p className="text-sm text-gray-500">
//           Add a new flight booking into the CRM system
//         </p>
//       </div> */}

//         <div className="mb-8 flex items-center gap-4">
//           <div className="p-3 bg-teal-600 rounded-xl shadow">
//             <MessageSquare size={28} className="text-white" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Create New Booking</h1>
//             <p className="text-gray-600">Add a new booking into the CRM system</p>
//           </div>
//         </div>

//       {/* Card */}
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Customer Section */}
//           <div>
//             <h3 className="text-sm font-semibold text-gray-700 mb-3">
//               CUSTOMER INFORMATION
//             </h3>

//             <div className="grid md:grid-cols-2 gap-4">
//               <Input
//                 icon={User}
//                 label="Customer Name"
//                 name="customerName"
//                 value={form.customerName}
//                 onChange={handleChange}
//                 placeholder="Hero Shukla"
//                 required
//               />

//               <Input
//                 icon={Hash}
//                 label="PNR"
//                 name="pnr"
//                 value={form.pnr}
//                 onChange={handleChange}
//                 placeholder="ABC421"
//                 required
//               />
//             </div>
//           </div>

//           {/* Flight Section */}
//           <div>
//             <h3 className="text-sm font-semibold text-gray-700 mb-3">
//               FLIGHT DETAILS
//             </h3>

//             <div className="grid md:grid-cols-2 gap-4">
//               <Input
//                 icon={Plane}
//                 label="Airline"
//                 name="airline"
//                 value={form.airline}
//                 onChange={handleChange}
//                 placeholder="Indigo"
//               />

//               <div>
//                 <label className="text-sm font-medium text-gray-600">
//                   Booking Status
//                 </label>
//                 <select
//                   name="status"
//                   value={form.status}
//                   onChange={handleChange}
//                   className="cursor-pointer mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-500"
//                 >
//                   {[
//                     "FRESH",
//                     "FOLLOW_UP",
//                     "TICKETING",
//                     "TICKETED",
//                     "CANCELLED",
//                     "CHARGEBACK",
//                     "AUTH_FORM_LOSS",
//                   ].map((s) => (
//                     <option key={s} value={s}>
//                       {s.replace("_", " ")}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Financial Section */}
//           <div>
//             <h3 className="text-sm font-semibold text-gray-700 mb-3">
//               FINANCIAL DETAILS
//             </h3>

//             <div className="grid md:grid-cols-3 gap-4">
//               <Input
//                 icon={IndianRupee}
//                 label="Amount"
//                 name="amount"
//                 type="number"
//                 value={form.amount}
//                 onChange={handleChange}
//                 placeholder="10000"
//                 required
//               />

//               <Input
//                 icon={Percent}
//                 label="Commission"
//                 name="commission"
//                 type="number"
//                 value={form.commission}
//                 onChange={handleChange}
//                 placeholder="1000"
//               />

//               <Input
//                 icon={BadgeCheck}
//                 label="MCO"
//                 name="mco"
//                 type="number"
//                 value={form.mco}
//                 onChange={handleChange}
//                 placeholder="500"
//               />
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end pt-4 border-t">
//             <button
//               disabled={loading}
//               className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium shadow-md disabled:opacity-50"
//             >
//               {loading ? "Creating..." : "Create Booking"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// /* Reusable Input Component */
// const Input = ({ icon: Icon, label, ...props }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-600">{label}</label>
//     <div className="relative mt-1">
//       <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//       <input
//         {...props}
//         className="w-full border rounded-lg pl-10 pr-3 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-500"
//       />
//     </div>
//   </div>
// );

// export default CreateBooking;



//======================2=================

// import { useState, useMemo } from "react";
// import API from "../api/axios";
// import {
//   User,
//   Plane,
//   Hash,
//   IndianRupee,
//   Percent,
//   BadgeCheck,
//   MessageSquare,
//   Calculator
// } from "lucide-react";

// const CreateBooking = () => {
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     customerName: "",
//     pnr: "",
//     airline: "",
//     status: "FRESH",
//     amount: "",
//     commission: "",
//     mco: "",
//     discount: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (
//       ["amount", "commission", "mco", "discount"].includes(name)
//     ) {
//       setForm({ ...form, [name]: value === "" ? "" : Number(value) });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // 🔢 Auto Preview (frontend only for UX)
//   const netAmount = useMemo(() => {
//     return (form.amount || 0) - (form.discount || 0);
//   }, [form.amount, form.discount]);

//   const netProfit = useMemo(() => {
//     return (form.commission || 0) + (form.mco || 0);
//   }, [form.commission, form.mco]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await API.post("/bookings", form); // backend auto calculate
//       alert("Booking created successfully ✅");

//       setForm({
//         customerName: "",
//         pnr: "",
//         airline: "",
//         status: "FRESH",
//         amount: "",
//         commission: "",
//         mco: "",
//         discount: "",
//       });
//     } catch {
//       alert("Failed to create booking ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-full mx-auto">
//       {/* Header */}
//       <div className="mb-8 flex items-center gap-4">
//         <div className="p-3 bg-teal-600 rounded-xl shadow">
//           <MessageSquare size={28} className="text-white" />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             Create New Booking
//           </h1>
//           <p className="text-gray-600">
//             Add a new booking into the CRM system
//           </p>
//         </div>
//       </div>

//       {/* Card */}
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Customer */}
//           <Section title="CUSTOMER INFORMATION">
//             <div className="grid md:grid-cols-2 gap-4">
//               <Input
//                 icon={User}
//                 label="Customer Name"
//                 name="customerName"
//                 value={form.customerName}
//                 onChange={handleChange}
//                 placeholder="Hero Shukla"
//                 required
//               />

//               <Input
//                 icon={Hash}
//                 label="PNR"
//                 name="pnr"
//                 value={form.pnr}
//                 onChange={handleChange}
//                 placeholder="ABC421"
//                 required
//               />
//             </div>
//           </Section>

//           {/* Flight */}
//           <Section title="FLIGHT DETAILS">
//             <div className="grid md:grid-cols-2 gap-4">
//               <Input
//                 icon={Plane}
//                 label="Airline"
//                 name="airline"
//                 value={form.airline}
//                 onChange={handleChange}
//                 placeholder="Indigo"
//               />

//               <Select
//                 label="Booking Status"
//                 name="status"
//                 value={form.status}
//                 onChange={handleChange}
//                 options={[
//                   "FRESH",
//                   "FOLLOW_UP",
//                   "TICKETING",
//                   "TICKETED",
//                   "CANCELLED",
//                   "CHARGEBACK",
//                   "AUTH_FORM_LOSS",
//                 ]}
//               />
//             </div>
//           </Section>

//           {/* Financial */}
//           <Section title="FINANCIAL DETAILS">
//             <div className="grid md:grid-cols-4 gap-4">
//               <Input
//                 icon={IndianRupee}
//                 label="Amount"
//                 name="amount"
//                 type="number"
//                 value={form.amount}
//                 onChange={handleChange}
//                 placeholder="10000"
//                 required
//               />

//               <Input
//                 icon={Percent}
//                 label="Discount"
//                 name="discount"
//                 type="number"
//                 value={form.discount}
//                 onChange={handleChange}
//                 placeholder="500"
//               />

//               <Input
//                 icon={Percent}
//                 label="Commission"
//                 name="commission"
//                 type="number"
//                 value={form.commission}
//                 onChange={handleChange}
//                 placeholder="1000"
//               />

//               <Input
//                 icon={BadgeCheck}
//                 label="MCO"
//                 name="mco"
//                 type="number"
//                 value={form.mco}
//                 onChange={handleChange}
//                 placeholder="300"
//               />
//             </div>
//           </Section>

//           {/* Auto Calculated Preview */}
//           <Section title="AUTO CALCULATED">
//             <div className="grid md:grid-cols-2 gap-4">
//               <ReadOnly
//                 icon={Calculator}
//                 label="Net Amount"
//                 value={`₹ ${netAmount}`}
//               />

//               <ReadOnly
//                 icon={Calculator}
//                 label="Net Profit"
//                 value={`₹ ${netProfit}`}
//                 highlight
//               />
//             </div>
//           </Section>

//           {/* Actions */}
//           <div className="flex justify-end pt-4 border-t">
//             <button
//               disabled={loading}
//               className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium shadow-md disabled:opacity-50"
//             >
//               {loading ? "Creating..." : "Create Booking"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // /* ---------- Reusable Components ---------- */

// const Section = ({ title, children }) => (
//   <div>
//     <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
//     {children}
//   </div>
// );

// const Input = ({ icon: Icon, label, ...props }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-600">{label}</label>
//     <div className="relative mt-1">
//       <Icon
//         className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//         size={18}
//       />
//       <input
//         {...props}
//         className="w-full border rounded-lg pl-10 pr-3 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-500"
//       />
//     </div>
//   </div>
// );

// const Select = ({ label, options, ...props }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-600">{label}</label>
//     <select
//       {...props}
//       className="cursor-pointer mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-500"
//     >
//       {options.map((s) => (
//         <option key={s} value={s}>
//           {s.replace("_", " ")}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const ReadOnly = ({ icon: Icon, label, value, highlight }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-600">{label}</label>
//     <div
//       className={`mt-1 flex items-center gap-3 border rounded-lg px-3 py-2 bg-gray-100 ${
//         highlight ? "text-green-700 font-semibold" : ""
//       }`}
//     >
//       <Icon size={18} />
//       <span>{value}</span>
//     </div>
//   </div>
// );

// export default CreateBooking;

//================================3===============================


// import { useState, useMemo } from "react";
// import API from "../api/axios";
// import {
//   User,
//   Plane,
//   Hash,
//   IndianRupee,
//   Percent,
//   Calculator,
//   MessageSquare,
// } from "lucide-react";

// const CreateBooking = () => {
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     customerName: "",
//     pnr: "",
//     airline: "",
//     status: "FRESH",

//     grossPrice: "",
//     profitType: "amount", // amount | percent
//     profitValue: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   /* 🔢 SALES PROFIT LOGIC */
//   const salesProfit = useMemo(() => {
//     if (!form.grossPrice) return 0;

//     if (form.profitType === "percent") {
//       return (Number(form.grossPrice) * Number(form.profitValue || 0)) / 100;
//     }

//     return Number(form.profitValue || 0);
//   }, [form.grossPrice, form.profitType, form.profitValue]);

//   const sellingPrice = useMemo(() => {
//     return Number(form.grossPrice || 0) + salesProfit;
//   }, [form.grossPrice, salesProfit]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await API.post("/bookings", {
//         customerName: form.customerName,
//         pnr: form.pnr,
//         airline: form.airline,
//         status: form.status,

//         grossPrice: Number(form.grossPrice),
//         sellingPrice,
//         salesProfit,
//       });

//       alert("Booking created successfully ✅");

//       setForm({
//         customerName: "",
//         pnr: "",
//         airline: "",
//         status: "FRESH",
//         grossPrice: "",
//         profitType: "amount",
//         profitValue: "",
//       });
//     } catch {
//       alert("Failed to create booking ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-full mx-auto">
//       {/* Header */}
//       <div className="mb-8 flex items-center gap-4">
//         <div className="p-3 bg-teal-600 rounded-xl shadow">
//           <MessageSquare size={28} className="text-white" />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             Create New Booking
//           </h1>
//           <p className="text-gray-600">
//             Sales Profit (MCO / Gross Profit)
//           </p>
//         </div>
//       </div>

//       {/* Card */}
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">

//           {/* CUSTOMER INFORMATION */}
//           <Section title="CUSTOMER INFORMATION">
//             <div className="grid md:grid-cols-2 gap-4">
//               <Input
//                 icon={User}
//                 label="Customer Name"
//                 name="customerName"
//                 value={form.customerName}
//                 onChange={handleChange}
//                 placeholder="Hero Shukla"
//                 required
//               />

//               <Input
//                 icon={Hash}
//                 label="PNR"
//                 name="pnr"
//                 value={form.pnr}
//                 onChange={handleChange}
//                 placeholder="ABC421"
//                 required
//               />
//             </div>
//           </Section>

//           {/* FLIGHT DETAILS */}
//           <Section title="FLIGHT DETAILS">
//             <div className="grid md:grid-cols-2 gap-4">
//               <Input
//                 icon={Plane}
//                 label="Airline"
//                 name="airline"
//                 value={form.airline}
//                 onChange={handleChange}
//                 placeholder="Indigo"
//               />

//               <Select
//                 label="Booking Status"
//                 name="status"
//                 value={form.status}
//                 onChange={handleChange}
//                 options={[
//                   "FRESH",
//                   "FOLLOW_UP",
//                   "TICKETING",
//                   "TICKETED",
//                   "CANCELLED",
//                   "CHARGEBACK",
//                   "AUTH_FORM_LOSS",
//                 ]}
//               />
//             </div>
//           </Section>

//           {/* FINANCIAL DETAILS */}
//           <Section title="FINANCIAL DETAILS">
//             <div className="grid md:grid-cols-2 gap-4">
//               <Input
//                 icon={IndianRupee}
//                 label="Gross Price"
//                 name="grossPrice"
//                 type="number"
//                 value={form.grossPrice}
//                 onChange={handleChange}
//                 placeholder="1000"
//                 required
//               />

//               <ReadOnly
//                 icon={Calculator}
//                 label="Selling Price"
//                 value={`₹ ${sellingPrice}`}
//               />
//             </div>
//           </Section>

//           {/* SALES PROFIT */}
//           <Section title="SALES PROFIT (OPTIONAL)">
//             <div className="grid md:grid-cols-3 gap-4">
//               <select
//                 name="profitType"
//                 value={form.profitType}
//                 onChange={handleChange}
//                 className="cursor-pointer mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
//               >
//                 <option value="amount">Amount</option>
//                 <option value="percent">Percent</option>
//               </select>

//               <Input
//                 icon={form.profitType === "percent" ? Percent : Calculator}
//                 label={
//                   form.profitType === "percent"
//                     ? "Profit %"
//                     : "Profit Amount"
//                 }
//                 name="profitValue"
//                 type="number"
//                 value={form.profitValue}
//                 onChange={handleChange}
//                 placeholder={
//                   form.profitType === "percent" ? "20" : "200"
//                 }
//               />

//               <ReadOnly
//                 icon={Calculator}
//                 label="Sales Profit"
//                 value={`₹ ${salesProfit}`}
//                 highlight
//               />
//             </div>
//           </Section>

//           {/* ACTION */}
//           <div className="flex justify-end pt-4 border-t">
//             <button
//               disabled={loading}
//               className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium shadow-md disabled:opacity-50"
//             >
//               {loading ? "Creating..." : "Create Booking"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// /* ---------- Reusable Components ---------- */

// const Section = ({ title, children }) => (
//   <div>
//     <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
//     {children}
//   </div>
// );

// const Input = ({ icon: Icon, label, ...props }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-600">{label}</label>
//     <div className="relative mt-1">
//       <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//       <input
//         {...props}
//         className="w-full border rounded-lg pl-10 pr-3 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-500"
//       />
//     </div>
//   </div>
// );

// const Select = ({ label, options, ...props }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-600">{label}</label>
//     <select
//       {...props}
//       className="cursor-pointer mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-500"
//     >
//       {options.map((s) => (
//         <option key={s} value={s}>
//           {s.replace("_", " ")}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const ReadOnly = ({ icon: Icon, label, value, highlight }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-600">{label}</label>
//     <div
//       className={`mt-1 flex items-center gap-3 border rounded-lg px-3 py-2 bg-gray-100 ${
//         highlight ? "text-green-700 font-semibold" : ""
//       }`}
//     >
//       <Icon size={18} />
//       <span>{value}</span>
//     </div>
//   </div>
// );

// export default CreateBooking;

//==============3======================

import { useState, useMemo } from "react";
import API from "../api/axios";
import {
  User,
  Plane,
  Hash,
  IndianRupee,
  MessageSquare,
  Calculator,
  Wallet
} from "lucide-react";

const CreateBooking = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    pnr: "",
    airline: "",
    status: "FRESH",

    costPrice: "",
    sellingPrice: "",

    expenseCategory: "",
    otherExpense: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value === "" ? "" : Number(value) || value });
  };

  // 🔢 LIVE PROFIT PREVIEW
  const profit = useMemo(() => {
    return (
      (Number(form.sellingPrice) || 0) -
      (Number(form.costPrice) || 0) -
      (Number(form.otherExpense) || 0)
    );
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/bookings", form);
      alert("Booking created successfully ✅");

      setForm({
        customerName: "",
        pnr: "",
        airline: "",
        status: "FRESH",
        costPrice: "",
        sellingPrice: "",
        expenseCategory: "",
        otherExpense: "",
      });
    } catch {
      alert("Failed to create booking ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-teal-600 rounded-xl shadow">
          <MessageSquare size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Booking
          </h1>
          <p className="text-gray-600">Profit / MCO Calculation</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* CUSTOMER */}
          <Section title="CUSTOMER INFORMATION">
            <div className="grid md:grid-cols-2 gap-4">
              <Input icon={User} label="Customer Name" name="customerName" value={form.customerName} onChange={handleChange} required />
              <Input icon={Hash} label="PNR" name="pnr" value={form.pnr} onChange={handleChange} required />
            </div>
          </Section>

          {/* FLIGHT */}
          
          <Section title="FLIGHT DETAILS">
  <div className="grid md:grid-cols-2 gap-4">
    <Input
      icon={Plane}
      label="Airline"
      name="airline"
      value={form.airline}
      onChange={handleChange}
    />

    <Select
      label="Booking Status"
      name="status"
      value={form.status}
      onChange={handleChange}
      options={[
        "FRESH",
        "FOLLOW_UP",
        "TICKETING",
        "TICKETED",
        "CANCELLED",
        "CHARGEBACK",
        "AUTH_FORM_LOSS",
      ]}
    />
  </div>
</Section>


          {/* PRICES */}
          <Section title="PRICING">
            <div className="grid md:grid-cols-2 gap-4">
              <Input icon={IndianRupee} label="Cost Price" name="costPrice" type="number" value={form.costPrice} onChange={handleChange} required />
              <Input icon={IndianRupee} label="Selling Price" name="sellingPrice" type="number" value={form.sellingPrice} onChange={handleChange} required />
            </div>
          </Section>

          {/* EXPENSE */}
          <Section title="ANY OTHER EXPENSE">
            <div className="grid md:grid-cols-2 gap-4">
              <Input icon={Wallet} label="Expense Category" name="expenseCategory" value={form.expenseCategory} onChange={handleChange} />
              <Input icon={IndianRupee} label="Expense Amount" name="otherExpense" type="number" value={form.otherExpense} onChange={handleChange} />
            </div>
          </Section>

          {/* PROFIT */}
          <Section title="AUTO CALCULATED">
            <ReadOnly icon={Calculator} label="PROFIT / MCO" value={`₹ ${profit}`} highlight />
          </Section>

          <div className="flex justify-end pt-4 border-t">
            <button disabled={loading} className="bg-teal-600 text-white px-6 py-2 rounded-lg">
              {loading ? "Saving..." : "Create Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* UI Helpers */
const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
    {children}
  </div>
);

const Input = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <div className="relative mt-1">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input {...props} className="w-full border rounded-lg pl-10 pr-3 py-2 bg-gray-50" />
    </div>
  </div>
);

const ReadOnly = ({ icon: Icon, label, value, highlight }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <div className={`mt-1 flex items-center gap-2 border px-3 py-2 bg-gray-100 ${highlight ? "text-green-700 font-semibold" : ""}`}>
      <Icon size={18} /> {value}
    </div>
  </div>
);
const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <select
      {...props}
      className="cursor-pointer mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-500"
    >
      {options.map((s) => (
        <option key={s} value={s}>
          {s.replace("_", " ")}
        </option>
      ))}
    </select>
  </div>
);



export default CreateBooking;

