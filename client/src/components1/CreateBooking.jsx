// import { useState } from "react";
// import API from "../api/axios";

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

//     // convert number fields to Number
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
//     } catch (err) {
//       alert("Failed to create booking ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl bg-white p-6 rounded-xl shadow">
//       <h2 className="text-xl font-bold mb-4">Create Booking</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Customer Name */}
//         <input
//           name="customerName"
//           placeholder="Customer Name"
//           value={form.customerName}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         {/* PNR */}
//         <input
//           name="pnr"
//           placeholder="PNR"
//           value={form.pnr}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         {/* Airline */}
//         <input
//           name="airline"
//           placeholder="Airline"
//           value={form.airline}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* Status */}
//         <select
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="FRESH">FRESH</option>
//           <option value="FOLLOW_UP">FOLLOW UP</option>
//           <option value="TICKETING">TICKETING</option>
//           <option value="TICKETED">TICKETED</option>
//           <option value="CANCELLED">CANCELLED</option>
//           <option value="CHARGEBACK">CHARGEBACK</option>
//           <option value="AUTH_FORM_LOSS">AUTH FORM LOSS</option>
//         </select>

//         {/* Amount */}
//         <input
//           name="amount"
//           type="number"
//           placeholder="Amount"
//           value={form.amount}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         {/* Commission */}
//         <input
//           name="commission"
//           type="number"
//           placeholder="Commission"
//           value={form.commission}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* MCO */}
//         <input
//           name="mco"
//           type="number"
//           placeholder="MCO"
//           value={form.mco}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* Submit */}
//         <button
//           disabled={loading}
//           className="bg-teal-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
//         >
//           {loading ? "Creating..." : "Create Booking"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateBooking;

//=========stylsih=============

import { useState } from "react";
import API from "../api/axios";
import {
  User,
  Plane,
  Hash,
  IndianRupee,
  Percent,
  BadgeCheck,  MessageSquare
} from "lucide-react";



const CreateBooking = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    pnr: "",
    airline: "",
    status: "FRESH",
    amount: "",
    commission: "",
    mco: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["amount", "commission", "mco"].includes(name)) {
      setForm({ ...form, [name]: value === "" ? "" : Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

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
        amount: "",
        commission: "",
        mco: "",
      });
    } catch {
      alert("Failed to create booking ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto">
      {/* Header */}
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Booking</h1>
        <p className="text-sm text-gray-500">
          Add a new flight booking into the CRM system
        </p>
      </div> */}

        <div className="mb-8 flex items-center gap-4">
          <div className="p-3 bg-teal-600 rounded-xl shadow">
            <MessageSquare size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create New Booking</h1>
            <p className="text-gray-600">Add a new booking into the CRM system</p>
          </div>
        </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              CUSTOMER INFORMATION
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                icon={User}
                label="Customer Name"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                placeholder="Hero Shukla"
                required
              />

              <Input
                icon={Hash}
                label="PNR"
                name="pnr"
                value={form.pnr}
                onChange={handleChange}
                placeholder="ABC421"
                required
              />
            </div>
          </div>

          {/* Flight Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              FLIGHT DETAILS
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                icon={Plane}
                label="Airline"
                name="airline"
                value={form.airline}
                onChange={handleChange}
                placeholder="Indigo"
              />

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Booking Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="cursor-pointer mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-500"
                >
                  {[
                    "FRESH",
                    "FOLLOW_UP",
                    "TICKETING",
                    "TICKETED",
                    "CANCELLED",
                    "CHARGEBACK",
                    "AUTH_FORM_LOSS",
                  ].map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Financial Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              FINANCIAL DETAILS
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              <Input
                icon={IndianRupee}
                label="Amount"
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                placeholder="10000"
                required
              />

              <Input
                icon={Percent}
                label="Commission"
                name="commission"
                type="number"
                value={form.commission}
                onChange={handleChange}
                placeholder="1000"
              />

              <Input
                icon={BadgeCheck}
                label="MCO"
                name="mco"
                type="number"
                value={form.mco}
                onChange={handleChange}
                placeholder="500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t">
            <button
              disabled={loading}
              className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium shadow-md disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* Reusable Input Component */
const Input = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <div className="relative mt-1">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        {...props}
        className="w-full border rounded-lg pl-10 pr-3 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-500"
      />
    </div>
  </div>
);

export default CreateBooking;

