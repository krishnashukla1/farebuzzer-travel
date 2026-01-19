

//==============1======================

// import { useState, useMemo } from "react";
// import API from "../api/axios";
// import {
//   User,
//   Plane,
//   Hash,
//   IndianRupee,DollarSign,
//   MessageSquare,
//   Calculator,
//   Wallet
// } from "lucide-react";

// const CreateBooking = () => {
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     customerName: "",
//     pnr: "",
//     airline: "",
//     status: "FRESH",

//     costPrice: "",
//     sellingPrice: "",

//     expenseCategory: "",
//     otherExpense: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value === "" ? "" : Number(value) || value });
//   };

//   // 🔢 LIVE PROFIT PREVIEW
//   const profit = useMemo(() => {
//     return (
//       (Number(form.sellingPrice) || 0) -
//       (Number(form.costPrice) || 0) -
//       (Number(form.otherExpense) || 0)
//     );
//   }, [form]);

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
//         costPrice: "",
//         sellingPrice: "",
//         expenseCategory: "",
//         otherExpense: "",
//       });
//     } catch {
//       alert("Failed to create booking ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-full mx-auto">
//       <div className="mb-8 flex items-center gap-4">
//         <div className="p-3 bg-teal-600 rounded-xl shadow">
//           <MessageSquare size={28} className="text-white" />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             Create New Booking
//           </h1>
//           {/* <p className="text-gray-600">Profit / MCO Calculation</p> */}
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-xl border">
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">

//           {/* CUSTOMER */}
//           <Section title="CUSTOMER INFORMATION">
//             <div className="grid md:grid-cols-2 gap-4">
//               <Input icon={User} label="Customer Name" name="customerName" value={form.customerName} onChange={handleChange} required />
//               <Input icon={Wallet} label="PNR" name="pnr" value={form.pnr} onChange={handleChange} required />
//             </div>
//           </Section>

//           {/* FLIGHT */}
          
//           <Section title="FLIGHT DETAILS">
//   <div className="grid md:grid-cols-2 gap-4">
//     <Input
//       icon={Plane}
//       label="Airline"
//       name="airline"
//       value={form.airline}
//       onChange={handleChange}
//     />

//     <Select
//       label="Booking Status"
//       name="status"
//       value={form.status}
//       onChange={handleChange}
//       options={[
//         "FRESH",
//         "FOLLOW_UP",
//         "TICKETING",
//         "TICKETED",
//         "CANCELLED",
//         "CHARGEBACK",
//         "AUTH_FORM_LOSS",
//       ]}
//     />
//   </div>
// </Section>


//           {/* PRICES */}
//           <Section title="PRICING">
//             <div className="grid md:grid-cols-2 gap-4">
//               <Input icon={DollarSign} label="Cost Price" name="costPrice" type="number" value={form.costPrice} onChange={handleChange} required />
//               <Input icon={DollarSign} label="Selling Price" name="sellingPrice" type="number" value={form.sellingPrice} onChange={handleChange} required />
//             </div>
//           </Section>

//           {/* EXPENSE */}
//           <Section title="ANY OTHER EXPENSE">
//             <div className="grid md:grid-cols-2 gap-4">
//               <Input icon={Wallet} label="Expense Category" name="expenseCategory" value={form.expenseCategory} onChange={handleChange} />
//               <Input icon={DollarSign} label="Expense Amount" name="otherExpense" type="number" value={form.otherExpense} onChange={handleChange} />
//             </div>
//           </Section>

//           {/* PROFIT */}
//           <Section title="AUTO CALCULATED">
//             <ReadOnly icon={Calculator} label="PROFIT / MCO" value={`$ ${profit}`} highlight />
//           </Section>

//           <div className="flex justify-end pt-4 border-t">
//             <button disabled={loading} className="cursor-pointer bg-teal-600 text-white px-6 py-2 rounded-lg">
//               {loading ? "Saving..." : "Create Booking"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// /* UI Helpers */
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
//       <input {...props} className="w-full border rounded-lg pl-10 pr-3 py-2 bg-gray-50" />
//     </div>
//   </div>
// );

// const ReadOnly = ({ icon: Icon, label, value, highlight }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-600">{label}</label>
//     <div className={`mt-1 flex items-center gap-2 border px-3 py-2 bg-gray-100 ${highlight ? "text-green-700 font-semibold" : ""}`}>
//       <Icon size={18} /> {value}
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


// export default CreateBooking;

//================

import { useState, useMemo } from "react";
import API from "../api/axios";
import {
  User,
  Plane,
  Hash,
  DollarSign,
  MessageSquare,
  Calculator,
  Wallet,
  AlertTriangle, // good icon for chargeback warning
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
    cbFees: "",           // ← NEW: Chargeback Fees

    expenseCategory: "",
    otherExpense: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value === "" ? "" : Number(value) || value });
  };

  // 🔢 LIVE PROFIT PREVIEW (now including CB Fees)
  const profit = useMemo(() => {
    return (
      (Number(form.sellingPrice) || 0) -
      (Number(form.costPrice) || 0) -
      (Number(form.otherExpense) || 0) -
      (Number(form.cbFees) || 0)           // ← Chargeback subtracted
    );
  }, [form]);

  const profitColor = profit > 0 ? "text-emerald-700" : 
                      profit < 0 ? "text-red-700" : 
                      "text-gray-700";

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
        cbFees: "",                      // reset new field
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
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* CUSTOMER */}
          <Section title="CUSTOMER INFORMATION">
            <div className="grid md:grid-cols-2 gap-4">
              <Input icon={User} label="Customer Name" name="customerName" value={form.customerName} onChange={handleChange} required />
              <Input icon={Wallet} label="PNR" name="pnr" value={form.pnr} onChange={handleChange} required />
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
            <div className="grid md:grid-cols-3 gap-4">
              <Input 
                icon={DollarSign} 
                label="Cost Price" 
                name="costPrice" 
                type="number" 
                value={form.costPrice} 
                onChange={handleChange} 
                required 
              />
              <Input 
                icon={DollarSign} 
                label="Selling Price" 
                name="sellingPrice" 
                type="number" 
                value={form.sellingPrice} 
                onChange={handleChange} 
                required 
              />
              {/* NEW FIELD */}
              <Input 
                icon={AlertTriangle} 
                label="Chargeback Fees (CB)" 
                name="cbFees" 
                type="number" 
                value={form.cbFees} 
                onChange={handleChange} 
                placeholder="0 if no chargeback"
                className="text-rose-700"
              />
            </div>
          </Section>

          {/* OTHER EXPENSE */}
          <Section title="ANY OTHER EXPENSE">
            <div className="grid md:grid-cols-2 gap-4">
              <Input 
                icon={Wallet} 
                label="Expense Category" 
                name="expenseCategory" 
                value={form.expenseCategory} 
                onChange={handleChange} 
              />
              <Input 
                icon={DollarSign} 
                label="Other Expense Amount" 
                name="otherExpense" 
                type="number" 
                value={form.otherExpense} 
                onChange={handleChange} 
              />
            </div>
          </Section>

          {/* PROFIT PREVIEW */}
          <Section title="NET RESULT (AUTO CALCULATED)">
            <div className={`border px-4 py-3 rounded-lg bg-gray-50 ${profitColor} font-semibold text-lg flex items-center gap-3`}>
              <Calculator size={24} />
              <div>
                Net Profit / Loss: ${profit.toLocaleString("en-IN")}
                {profit < 0 && <span className="ml-2 text-sm">(Loss due to expenses/chargeback)</span>}
              </div>
            </div>
          </Section>

          <div className="flex justify-end pt-4 border-t">
            <button 
              disabled={loading} 
              className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Create Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* UI Helpers remain the same */
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
      <input 
        {...props} 
        className={`w-full border rounded-lg pl-10 pr-3 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-500 ${props.className || ''}`} 
      />
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

