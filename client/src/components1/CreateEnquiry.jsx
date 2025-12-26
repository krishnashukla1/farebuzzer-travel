// import { useState } from "react";
// import API from "../api/axios";

// const CreateEnquiry = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/enquiries", form);
//       alert("Enquiry submitted successfully");
//       setForm({ name: "", email: "", phone: "", message: "" });
//     } catch (err) {
//       alert("Failed to submit enquiry");
//     }
//   };

//   return (
//     <div className="max-w-xl bg-white p-6 rounded-xl shadow">
//       <h2 className="text-xl font-bold mb-4">Create Enquiry</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
//         <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" required />
//         <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" required />
//         <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} className="w-full border p-2 rounded" required />

//         <button className="bg-teal-600 text-white px-4 py-2 rounded">
//           Create Enquiry
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEnquiry;

//==============stylsih===============
import { useState } from "react";
import API from "../api/axios";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send
} from "lucide-react";

const CreateEnquiry = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/enquiries", form);
      alert("Enquiry submitted successfully ✅");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      alert("Failed to submit enquiry ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto">
      {/* Header */}
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Enquiry</h1>
        <p className="text-sm text-gray-500">
          Capture customer travel enquiries and follow-ups
        </p>
      </div> */}


         <div className="mb-8 flex items-center gap-4">
          <div className="p-3 bg-teal-600 rounded-xl shadow">
            <MessageSquare size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create New Enquiry</h1>
            <p className="text-gray-600">Capture customer travel enquiries and follow-ups</p>
          </div>
        </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              CONTACT INFORMATION
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                icon={User}
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Hero Shukla"
                required
              />

              <Input
                icon={Mail}
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="hero@gmail.com"
                required
              />
            </div>

            <div className="mt-4">
              <Input
                icon={Phone}
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              ENQUIRY MESSAGE
            </h3>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Message
              </label>
              <div className="relative mt-1">
                <MessageSquare
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Customer travel requirement..."
                  className="w-full border rounded-lg pl-10 pr-3 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t">
            <button
              disabled={loading}
              className="cursor-pointer flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium shadow-md disabled:opacity-50"
            >
              <Send size={16} />
              {loading ? "Submitting..." : "Create Enquiry"}
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
      <Icon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        {...props}
        className="w-full border rounded-lg pl-10 pr-3 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-500"
      />
    </div>
  </div>
);

export default CreateEnquiry;
