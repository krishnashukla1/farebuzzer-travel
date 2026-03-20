
//==========================more field added=========================


import { useState, useEffect ,useRef,useMemo } from "react";
import API from "../api/axios";
import { User, Mail, Phone, MessageSquare, Send } from "lucide-react";

const CreateEnquiry = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    origin: "",
    destination: "",
    travelDate: "",
    passengers: 1,
    travelType: "FLIGHT",
    expectedBudget: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "passengers" || name === "expectedBudget" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Optional: basic client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      alert("Please fill in all required contact fields");
      setLoading(false);
      return;
    }

    try {
      await API.post("/enquiries", form);
      alert("Enquiry submitted successfully ✅");

      setForm({
        name: "",
        email: "",
        phone: "",
        origin: "",
        destination: "",
        travelDate: "",
        passengers: 1,
        travelType: "FLIGHT",
        expectedBudget: "",
        message: "",
      });
    } catch (err) {
      console.error("Enquiry submission error:", err);
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

const INDIAN_AIRPORTS = [
  // 🏙️ Metro Cities
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International Airport" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj International Airport" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International Airport" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International Airport" },
  { code: "MAA", city: "Chennai", name: "Chennai International Airport" },
  { code: "CCU", city: "Kolkata", name: "Netaji Subhash Chandra Bose International Airport" },

  // 🌆 Tier-1 / Business Hubs
  { code: "PNQ", city: "Pune", name: "Pune Airport" },
  { code: "AMD", city: "Ahmedabad", name: "Sardar Vallabhbhai Patel International Airport" },
  { code: "CJB", city: "Coimbatore", name: "Coimbatore International Airport" },
  { code: "TRV", city: "Trivandrum", name: "Trivandrum International Airport" },
  { code: "COK", city: "Kochi", name: "Cochin International Airport" },
  { code: "IXC", city: "Chandigarh", name: "Chandigarh International Airport" },

  // 🌴 Tourist / Leisure Destinations
  { code: "GOI", city: "Goa", name: "Manohar International Airport" },
  { code: "IXZ", city: "Port Blair", name: "Veer Savarkar International Airport" },
  { code: "SXR", city: "Srinagar", name: "Sheikh ul-Alam International Airport" },
  { code: "JAI", city: "Jaipur", name: "Jaipur International Airport" },
  { code: "UDR", city: "Udaipur", name: "Maharana Pratap Airport" },

  //  Industrial / Growing Cities
  { code: "BBI", city: "Bhubaneswar", name: "Biju Patnaik International Airport" },
  { code: "VTZ", city: "Visakhapatnam", name: "Visakhapatnam International Airport" },
  { code: "NAG", city: "Nagpur", name: "Dr. Babasaheb Ambedkar International Airport" },
  { code: "RPR", city: "Raipur", name: "Swami Vivekananda Airport" },
  { code: "IDR", city: "Indore", name: "Devi Ahilya Bai Holkar Airport" },

  //  North & Central India
  { code: "LKO", city: "Lucknow", name: "Chaudhary Charan Singh International Airport" },
  { code: "VNS", city: "Varanasi", name: "Lal Bahadur Shastri International Airport" },
  { code: "AGR", city: "Agra", name: "Agra Airport" },
  { code: "GWL", city: "Gwalior", name: "Rajmata Vijaya Raje Scindia Airport" },

  //  North-East India
  { code: "GAU", city: "Guwahati", name: "Lokpriya Gopinath Bordoloi International Airport" },
  { code: "IMF", city: "Imphal", name: "Bir Tikendrajit International Airport" },
  { code: "AJL", city: "Aizawl", name: "Lengpui Airport" },
  { code: "SHL", city: "Shillong", name: "Shillong Airport" },

  // South India – More Coverage
  { code: "IXM", city: "Madurai", name: "Madurai Airport" },
  { code: "TIR", city: "Tirupati", name: "Tirupati Airport" },
  { code: "VGA", city: "Vijayawada", name: "Vijayawada International Airport" },
  { code: "TRZ", city: "Trichy", name: "Tiruchirappalli International Airport" },
];



function AirportAutocomplete({ label, name, value = "", onChange, placeholder }) {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Sync when parent changes (edit / reset form)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Filter airports
  const filteredAirports = useMemo(() => {
    if (!inputValue.trim()) return [];
    const search = inputValue.toLowerCase().trim();

    return INDIAN_AIRPORTS.filter(
      (a) =>
        a.code.toLowerCase().includes(search) ||
        a.city.toLowerCase().includes(search) ||
        a.name.toLowerCase().includes(search)
    ).slice(0, 12);
  }, [inputValue]);

  // Close on outside click (SAFE)
  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, []);

  const handleSelect = (airport) => {
    const finalValue = `${airport.city} (${airport.code})`;

    setInputValue(finalValue);
    onChange({
      target: { name, value: finalValue },
    });

    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen && e.key !== "Escape") {
      setIsOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev >= filteredAirports.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev <= 0 ? filteredAirports.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredAirports[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck="false"
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
          setHighlightedIndex(-1);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                   outline-none transition-all"
      />

      {isOpen && filteredAirports.length > 0 && (
        <ul
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200
                     rounded-lg shadow-xl max-h-64 overflow-auto"
          onMouseDown={(e) => e.preventDefault()}
        >
          {filteredAirports.map((airport, index) => (
            <li
              key={airport.code}
              onMouseDown={() => handleSelect(airport)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`px-4 py-2.5 cursor-pointer text-sm
                ${index === highlightedIndex
                  ? "bg-teal-50 text-teal-800"
                  : "hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-teal-600 w-12">
                  {airport.code}
                </span>
                <div>
                  <div className="font-medium">{airport.city}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {airport.name}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isOpen && inputValue.trim() && filteredAirports.length === 0 && (
        <div className="absolute z-50 w-full mt-1 p-3 bg-white border rounded-lg shadow text-sm text-gray-500">
          No matching airports found
        </div>
      )}
    </div>
  );
}









  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-teal-600 rounded-xl shadow">
          <MessageSquare size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Create New Enquiry</h1>
          <p className="text-gray-600">Capture customer travel enquiries and follow-ups</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-4 tracking-wide">
              CONTACT INFORMATION
            </h3>

            <div className="grid md:grid-cols-3 gap-5">
              <Input
                icon={User}
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />

              <Input
                icon={Mail}
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="johndoe@gmail.com"
                required
              />

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

            {/* <div className="mt-5">
              <Input
                icon={Phone}
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
              />
            </div> */}
          </div>

          {/* Travel Details */}
          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-4 tracking-wide">
              TRAVEL DETAILS
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              {/* <Input
                label="Origin (From)"
                name="origin"
                value={form.origin}
                onChange={handleChange}
                placeholder="Delhi (DEL)"
              /> */}
               <AirportAutocomplete
    label="Origin (From)"
    name="origin"
    value={form.origin}
    onChange={handleChange}
    placeholder="Delhi (DEL)"
  />

  <AirportAutocomplete
    label="Destination (To)"
    name="destination"
    value={form.destination}
    onChange={handleChange}
    placeholder="Mumbai (BOM)"
  />


              {/* <Input
                label="Destination (To)"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="Mumbai (BOM)"
              /> */}

              

              <Input
                label="Travel Date"
                name="travelDate"
                type="date"
                value={form.travelDate}
                onChange={handleChange}
              />

              <Input
                label="No. of Passengers"
                name="passengers"
                type="number"
                min="1"
                value={form.passengers}
                onChange={handleChange}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Travel Type
                </label>
                <select
                  name="travelType"
                  value={form.travelType}
                  onChange={handleChange}
                  className="cursor-pointer w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                >
                  <option value="FLIGHT">Flight</option>
                  <option value="HOTEL">Hotel</option>
                  <option value="PACKAGE">Package</option>
                  <option value="VISA">Visa Assistance</option>
                  <option value="TRANSFER">Airport Transfer</option>
                </select>
              </div>

              <Input
                label="Expected Budget ($)"
                name="expectedBudget"
                type="number"
                value={form.expectedBudget}
                onChange={handleChange}
                placeholder="45000"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-4 tracking-wide">
              ENQUIRY MESSAGE
            </h3>

            <div className="relative">
              <MessageSquare
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={1}
                placeholder="Customer travel requirement, preferences, special requests..."
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-y min-h-[100px]"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className={`
                flex items-center gap-2 
                bg-teal-600 hover:bg-teal-700 
                text-white px-7 py-3 rounded-lg 
                font-medium shadow-md transition-all
                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
              `}
            >
              <Send size={18} />
              {loading ? "Submitting..." : "Create Enquiry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
const Input = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
      {props.required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
      )}
      <input
        {...props}
        className={`
          w-full border border-gray-300 rounded-lg 
          ${Icon ? "pl-10" : "pl-3"} pr-3 py-2.5 
          bg-gray-50 focus:ring-2 focus:ring-teal-500 
          focus:border-teal-500 outline-none transition
        `}
      />
    </div>
  </div>
);

export default CreateEnquiry;