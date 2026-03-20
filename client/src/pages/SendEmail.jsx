import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import API from "../api/axios";

const SendEmail = () => {
  const [emailType, setEmailType] = useState("new_reservation");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  // NEW STATE: Track if email was sent successfully to show Pay Now button
  const [emailSent, setEmailSent] = useState(false);

  // NEW STATE: Store booking data for payment page
  const [bookingData, setBookingData] = useState(null);
  // Add this near your other state declarations
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      prefix: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      gender: ""
    }
  ]);

  // NEW: Itinerary parsing state
  const [itineraryText, setItineraryText] = useState("");
  const [isParsingItinerary, setIsParsingItinerary] = useState(false);
  const [parsedSegments, setParsedSegments] = useState([]);
  const [showItineraryBox, setShowItineraryBox] = useState(false);

  // Sender brand for all email types
  const [senderBrand, setSenderBrand] = useState("lowfare_studio");

  // NEW STATE: Store messageId for threading
  const [messageId, setMessageId] = useState(null);


  // Initialize navigate hook
  const navigate = useNavigate();

  // Cabin Class options (for flight ticket form)
  const cabinClassOptions = [
    "Economy",
    "Premium Economy",
    "Business",
    "First Class"
  ];

  // Fare Type options (for flight ticket form)
  const fareTypeOptions = [
    { label: "Saver Fare", value: "SAVER" },
    { label: "Regular Fare", value: "REGULAR" },
    { label: "Flexible Fare", value: "FLEXIBLE" },
    { label: "Fully Refundable Fare", value: "REFUNDABLE" },
    { label: "Promotional Fare", value: "PROMO" },
    { label: "Non-Refundable Fare", value: "NON_REFUNDABLE" },
    { label: "Corporate Fare", value: "CORPORATE" },
    { label: "Student Fare", value: "STUDENT" }
  ];

  // Update type options for cancellation/change emails
  const updateTypeOptions = [
    { value: "", label: "Select update type" },
    { value: "cancelled", label: "Cancelled" },
    { value: "changed", label: "Changed" },
    { value: "confirmed", label: "Confirmed" }
  ];

  // Baggage options
  const checkInBaggageOptions = [
    { value: "", label: "Select Check-in Baggage" },
    { value: "0 kg", label: "0 kg" },
    { value: "15 kg", label: "15 kg" },
    { value: "1 pc", label: "1 piece" },
    { value: "2 pc", label: "2 pieces" }
  ];

  const carryOnBaggageOptions = [
    { value: "", label: "Select Carry-on Baggage" },
    { value: "0 kg", label: "0 kg" },
    { value: "5 kg", label: "5 kg" },
    { value: "7 kg", label: "7 kg" },
    { value: "10 kg", label: "10 kg" }
  ];

  // Add new passenger
  const addPassenger = () => {
    const newId = passengers.length > 0
      ? Math.max(...passengers.map(p => p.id)) + 1
      : 1;

    setPassengers([...passengers, {
      id: newId,
      prefix: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      gender: ""
    }]);
  };

  // Remove passenger
  const removePassenger = (id) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter(p => p.id !== id));
    } else {
      setErrorMessage("At least one passenger is required");
    }
  };

  // Handle passenger field changes
  const handlePassengerChange = (id, field, value) => {
    setPassengers(passengers.map(passenger =>
      passenger.id === id
        ? { ...passenger, [field]: value }
        : passenger
    ));
  };

  // Initial form state for GENERAL form (non-flight-ticket)
  const initialGeneralFormState = {
    customerPrefix: "",
    customerFirstName: "",
    customerMiddleName: "",
    customerLastName: "",
    customerDOB: "",
    customerGender: "",
    customerName: "",
    customerPhone: "",
    billingEmail: "",
    updateType: "confirmed", // Default to confirmed for new reservations
    includeAgreement: true,
    includeChargeNote: true,
    includeFareRules: false,
    cardHolderName: "",
    cardLastFour: "",
    cardExpiry: "",
    cardCVV: "",
    billingAddress: "",
    checkInBaggage: "",
    carryOnBaggage: "",
    customerEmail: "",
    confirmationNumber: "",
    airline: "",
    departure: "",
    arrival: "",
    travelDate: "",
    bookingAmount: "",
    oldTravelDate: "",
    newTravelDate: "",
    changeFee: "",
    fareDifference: "",
    refundAmount: "",
    cancellationDate: "",
    customMessage: "",
    searchQuery: "",
    category: "",
    destination: "",
    packageName: "",
    packageNights: "",
    packageStartDate: "",
    packageEndDate: "",
    packagePrice: "",
    numberOfPersons: "",
    hotelName: "",
    roomType: "",
    carType: "",
    rentalDays: "",
    insuranceType: "",
    insuranceCoverage: ""
  };

  // Initial form state for FLIGHT TICKET form
  const initialFlightFormState = {


    customerPrefix: "",
    customerFirstName: "",
    customerMiddleName: "",
    customerLastName: "",
    customerDOB: "",
    customerGender: "",

    connectionTime: "", // Add this field

    customerName: "",
    customerPhone: "",
    billingEmail: "",
    checkInBaggage: "",
    carryOnBaggage: "",
    confirmationNumber: "",
    airline: "",
    departure: "",
    arrival: "",
    travelDate: "",
    cabinClass: "Economy",
    bookingAmount: "",
    customMessage: "",
    ticketNumber: "",
    departureTime: "",
    arrivalTime: "",
    flightNumber: "",
    fareType: "REGULAR",
    departureTerminal: "",
    arrivalTerminal: "",
    // NEW: Add update fields to flight form
    updateType: "confirmed",
    includeAgreement: true,
    includeChargeNote: true,
    includeFareRules: false,
    cardHolderName: "",
    cardLastFour: "",
    cardExpiry: "",
    cardCVV: "",
    billingAddress: "",
    customerEmail: ""
  };


  
  // Add prefix options
  const prefixOptions = [
    { value: "", label: "Select Title" },
    { value: "mr", label: "Mr." },
    { value: "mrs", label: "Mrs." },
    { value: "miss", label: "Miss" },
    { value: "master", label: "Master" }
  ];
  // Add gender options
  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" }
  ];

  // Use different form states based on emailType
  const [generalForm, setGeneralForm] = useState(initialGeneralFormState);
  const [flightForm, setFlightForm] = useState(initialFlightFormState);

  // Determine which form to use based on emailType
  const isFlightTicketForm = emailType === "new_reservation" || emailType === "flight_confirmation";

  // Get current form based on type
  const currentForm = isFlightTicketForm ? flightForm : generalForm;

  // Load templates on component mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Load templates when email type changes
  useEffect(() => {
    if (emailType) {
      fetchTemplates();
    }
  }, [emailType]);

  // Reset email sent state when form changes
  useEffect(() => {
    // Reset email sent state when user starts editing the form again
    if (emailSent) {
      const formHasChanged = Object.keys(currentForm).some(key =>
        currentForm[key] !== initialGeneralFormState[key]
      );
      if (formHasChanged) {
        setEmailSent(false);
        setBookingData(null);
      }
    }
  }, [currentForm, emailSent]);

  // NEW: Function to parse itinerary text
  const parseItinerary = async () => {
    if (!itineraryText.trim()) {
      setErrorMessage("Please paste itinerary text first");
      return;
    }

    setIsParsingItinerary(true);
    setParsedSegments([]);

    try {
      // Simple parsing logic - can be enhanced
      const lines = itineraryText.split('\n');
      const segments = [];
      let passengerName = "";
      let confirmationNumber = "";
      let airline = "";

      // Look for common GDS patterns
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Extract passenger name
        // if (line.includes("PASSENGER NAME:") || line.includes("SHUKLA/")) {

        if (line.includes("PASSENGER NAME:")) {

          passengerName = line.split(':')[1]?.trim() || line.split('/')[0]?.trim() || "";
        }

        // Extract confirmation/record locator
        if (line.includes("RP/") || line.includes("RECORD LOCATOR")) {
          const rpMatch = line.match(/RP\/([A-Z0-9]+)/);
          if (rpMatch) confirmationNumber = rpMatch[1];
        }

        // Extract flight segments (lines with flight numbers)
        const flightMatch = line.match(/(\d+\.\s+)?([A-Z0-9]{2})\s+(\d+)\s+([A-Z])\s+(\d{1,2}[A-Z]{3})\s+(\d)\s+([A-Z]{3})([A-Z]{3})\s+([A-Z0-9]{2,4})\s+(\d{4})\s+(\d{4})/i);
        if (flightMatch) {
          const [, , airlineCode, flightNum, cabinClass, date, dayOfWeek, dep, arr, , depTime, arrTime] = flightMatch;

          // Convert date to YYYY-MM-DD format (assuming current year)
          const currentYear = new Date().getFullYear();
          const month = date.slice(2, 5);
          const day = date.slice(0, 2);
          const months = {
            'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04', 'MAY': '05', 'JUN': '06',
            'JUL': '07', 'AUG': '08', 'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
          };
          const formattedDate = `${currentYear}-${months[month.toUpperCase()]}-${day.padStart(2, '0')}`;

          // Format times
          const formattedDepTime = depTime.length === 3 ? `0${depTime}` : depTime;
          const formattedArrTime = arrTime.length === 3 ? `0${arrTime}` : arrTime;

          segments.push({
            airline: airlineCode,
            flightNumber: flightNum,
            departure: dep,
            arrival: arr,
            date: formattedDate,
            departureTime: `${formattedDepTime.slice(0, 2)}:${formattedDepTime.slice(2, 4)}`,
            arrivalTime: `${formattedArrTime.slice(0, 2)}:${formattedArrTime.slice(2, 4)}`,
            cabinClass: cabinClass === 'Y' ? 'Economy' : cabinClass === 'J' ? 'Business' : 'First Class'
          });

          if (!airline && airlineCode) {
            airline = airlineCode === 'EK' ? 'Emirates' :
              airlineCode === 'AA' ? 'American Airlines' :
                airlineCode === 'DL' ? 'Delta Airlines' :
                  airlineCode === 'UA' ? 'United Airlines' : airlineCode;
          }
        }
      }

      if (segments.length > 0) {
        setParsedSegments(segments);

        // Auto-fill form with first segment
        const firstSegment = segments[0];
        setFlightForm(prev => ({
          ...prev,
          customerName: passengerName || prev.customerName,
          confirmationNumber: confirmationNumber || prev.confirmationNumber,
          airline: airline || prev.airline,
          flightNumber: firstSegment.flightNumber,
          departure: firstSegment.departure,
          arrival: firstSegment.arrival,
          travelDate: firstSegment.date,
          departureTime: firstSegment.departureTime,
          arrivalTime: firstSegment.arrivalTime,
          cabinClass: firstSegment.cabinClass
        }));

        setSuccessMessage(`Successfully parsed ${segments.length} flight segment(s)`);
      } else {
        setErrorMessage("No flight segments found. Please check the format.");
      }
    } catch (error) {
      console.error("Error parsing itinerary:", error);
      setErrorMessage("Error parsing itinerary. Please check the format.");
    } finally {
      setIsParsingItinerary(false);
    }
  };

  // NEW: Function to handle paste with sample itinerary
  const handlePasteSample = () => {
    const sampleItinerary = `RP/DELAM0100/DELAM0100           ABC123/WS  10FEB26
  1. EK 513 Y 10FEB 3 DELDXB HK1 2230 0045+1
     OPERATED BY EMIRATES
     TERMINAL 3
  2. EK 202 Y 11FEB 4 DXBLHR HK1 0915 1345
     OPERATED BY EMIRATES
     TERMINAL 3

PASSENGER NAME:
  1. SHUKLA/KRISHNA MR

TKT-ETKT 1761234567890
FARE USD 520.00
TAX USD 80.00
TOTAL USD 600.00

BAGGAGE:
  CARRY ON: 7KG
  CHECKED: 1PC

CONTACT:
  EMAIL: KRISHNA.SHUKLA@EMAIL.COM
  PHONE: +91XXXXXXXXXX

END OF ITINERARY`;

    setItineraryText(sampleItinerary);
    setShowItineraryBox(true);
  };

  const fetchTemplates = async () => {
    try {
      setLoadingTemplates(true);
      const response = await API.get("/email/templates");
      setTemplates(response.data?.data || []);
    } catch (error) {
      console.error("Error loading templates:", error);
      setTemplates([]);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Reset email sent state when form changes
    if (emailSent) {
      setEmailSent(false);
      setBookingData(null);
      setMessageId(null); // ✅ Also reset messageId
    }

    if (isFlightTicketForm) {
      // Handle checkboxes differently
      if (type === 'checkbox') {
        setFlightForm({ ...flightForm, [name]: checked });
      } else {
        setFlightForm({ ...flightForm, [name]: value });
      }
    } else {
      // Handle checkboxes differently
      if (type === 'checkbox') {
        setGeneralForm({ ...generalForm, [name]: checked });
      } else {
        setGeneralForm({ ...generalForm, [name]: value });
      }
    }
  };

  const handleEmailTypeChange = (e) => {
    const newType = e.target.value;
    setEmailType(newType);
    setSelectedTemplate("");
    setEmailSent(false);
    setBookingData(null);
    setMessageId(null); // ✅ Reset messageId when changing email type

    // Clear forms when changing email type (except customer info)
    const currentCustomerInfo = {
      customerName: currentForm.customerName,
      customerPhone: currentForm.customerPhone,
      billingEmail: currentForm.billingEmail
    };

    if (newType === "new_reservation" || newType === "flight_confirmation") {
      // Reset flight form but keep customer info
      setFlightForm({
        ...initialFlightFormState,
        ...currentCustomerInfo,
        // Set updateType based on email type
        updateType: newType === "new_reservation" ? "confirmed" : "confirmed"
      });
    } else {
      // Reset general form but keep customer info and search fields
      const updateTypeValue =
        newType === "exchange_ticket" ? "changed" :
          newType === "flight_cancellation" ? "cancelled" :
            "confirmed";

      setGeneralForm({
        ...initialGeneralFormState,
        ...currentCustomerInfo,
        updateType: updateTypeValue,
        searchQuery: generalForm.searchQuery,
        category: generalForm.category,
        destination: generalForm.destination
      });
    }

    // Hide itinerary box when switching away from flight-related types
    if (newType !== "new_reservation" && newType !== "flight_confirmation") {
      setShowItineraryBox(false);
    }
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    console.log("Selecting template:", templateId);
    setSelectedTemplate(templateId);
    setEmailSent(false);
    setBookingData(null);

    const template = templates.find(t => t._id === templateId);

    if (template && template.data) {
      console.log("Template data found:", template.data);

      // Create new form state with template data merged
      const newForm = {
        ...initialGeneralFormState,
        // Keep customer info if already entered
        customerName: generalForm.customerName || "",
        customerPhone: generalForm.customerPhone || "",
        billingEmail: generalForm.billingEmail || "",
        searchQuery: generalForm.searchQuery || "",
        category: generalForm.category || "",
        destination: generalForm.destination || "",
        // Apply all template data
        ...template.data,
        // Ensure email type matches
        emailType: template.emailType
      };

      setGeneralForm(newForm);

      // Also update the email type to match the template
      if (template.emailType !== emailType) {
        setEmailType(template.emailType);
      }

      setSuccessMessage(`Template "${template.name}" loaded successfully!`);
    } else {
      console.error("Template not found or has no data:", template);
      setErrorMessage("Failed to load template data");
    }
  };

  // Save current form as template
  const saveAsTemplate = async () => {
    if (emailType !== "holiday_package") {
      setErrorMessage("Templates can only be saved for Holiday Packages");
      return;
    }

    if (!newTemplateName.trim()) {
      setErrorMessage("Please enter a template name");
      return;
    }

    setIsSavingTemplate(true);
    try {
      // Extract template data (exclude customer-specific fields)
      const templateData = {
        name: newTemplateName,
        emailType: emailType,
        data: {
          // Package details
          packageName: generalForm.packageName || "",
          packageNights: generalForm.packageNights || "",
          packageStartDate: generalForm.packageStartDate || "",
          packageEndDate: generalForm.packageEndDate || "",
          packagePrice: generalForm.packagePrice || "",
          numberOfPersons: generalForm.numberOfPersons || "",

          // Hotel details
          hotelName: generalForm.hotelName || "",
          roomType: generalForm.roomType || "",

          // Flight details
          departure: generalForm.departure || "",
          arrival: generalForm.arrival || "",
          travelDate: generalForm.travelDate || "",
          bookingAmount: generalForm.bookingAmount || "",
          oldTravelDate: generalForm.oldTravelDate || "",
          newTravelDate: generalForm.newTravelDate || "",
          changeFee: generalForm.changeFee || "",
          fareDifference: generalForm.fareDifference || "",
          refundAmount: generalForm.refundAmount || "",
          cancellationDate: generalForm.cancellationDate || "",
          customMessage: generalForm.customMessage || "",
          confirmationNumber: generalForm.confirmationNumber || "",
          airline: generalForm.airline || "",

          // Other services
          carType: generalForm.carType || "",
          rentalDays: generalForm.rentalDays || "",
          insuranceType: generalForm.insuranceType || "",
          insuranceCoverage: generalForm.insuranceCoverage || "",

          // Search fields (optional)
          searchQuery: generalForm.searchQuery || "",
          category: generalForm.category || "",
          destination: generalForm.destination || "",

          // New fields for cancellation/change emails
          updateType: generalForm.updateType || "",
          includeAgreement: generalForm.includeAgreement || true,
          includeChargeNote: generalForm.includeChargeNote || true,
          includeFareRules: generalForm.includeFareRules || false,
          cardHolderName: generalForm.cardHolderName || "",
          cardLastFour: generalForm.cardLastFour || "",
          cardExpiry: generalForm.cardExpiry || "",
          cardCVV: generalForm.cardCVV || "",
          billingAddress: generalForm.billingAddress || "",
          customerEmail: generalForm.customerEmail || ""
        }
      };

      console.log("Saving template data:", templateData);

      const response = await API.post("/email/templates", templateData);
      console.log("Template saved:", response.data);

      setSuccessMessage("Template saved successfully!");
      setNewTemplateName("");
      setShowTemplateModal(false);
      fetchTemplates(); // Refresh templates list
    } catch (error) {
      console.error("Error saving template:", error);
      setErrorMessage(error.response?.data?.message || "Failed to save template");
    } finally {
      setIsSavingTemplate(false);
    }
  };

  // Delete template
  const deleteTemplate = async (templateId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this template?")) {
      try {
        await API.delete(`/email/templates/${templateId}`);
        setTemplates(templates.filter(t => t._id !== templateId));
        if (selectedTemplate === templateId) {
          setSelectedTemplate("");
        }
        setSuccessMessage("Template deleted successfully!");
      } catch (error) {
        setErrorMessage("Failed to delete template");
      }
    }
  };

  // NEW: Function to handle Pay Now button click
  const handlePayNow = () => {
    // Prepare data to pass to payment page
    const paymentData = {
      customerName: currentForm.customerName,
      customerEmail: currentForm.billingEmail,
      customerPhone: currentForm.customerPhone,
      bookingAmount: currentForm.bookingAmount || "0.00",
      emailType: emailType,
      senderBrand: senderBrand,
      // ✅ Include messageId for future replies
      messageId: messageId,
      // Include flight-specific data if applicable
      ...(isFlightTicketForm && {
        airline: flightForm.airline,
        flightNumber: flightForm.flightNumber,
        departure: flightForm.departure,
        arrival: flightForm.arrival,
        travelDate: flightForm.travelDate,
        confirmationNumber: flightForm.confirmationNumber
      }),
      // Include package data if applicable
      ...(emailType === "holiday_package" && {
        packageName: generalForm.packageName,
        packagePrice: generalForm.packagePrice,
        packageNights: generalForm.packageNights
      })
    };

    // Store booking data in state and navigate to payment page
    setBookingData(paymentData);
    navigate("/payment", {
      state: {
        bookingData: paymentData,
        // ✅ Pass messageId to payment page if needed
        messageId: messageId
      }
    });
  };


  // Add this function if you need to reply to existing emails
  const setReplyToEmail = (originalEmail) => {
    // Set form data from original email
    if (originalEmail.emailType === "new_reservation" || originalEmail.emailType === "flight_confirmation") {
      setFlightForm(prev => ({
        ...prev,
        customerName: originalEmail.meta?.customerName || "",
        customerPhone: originalEmail.meta?.customerPhone || "",
        billingEmail: originalEmail.meta?.billingEmail || "",
        confirmationNumber: originalEmail.meta?.confirmationNumber || "",
        // ... other fields from originalEmail.meta
      }));
    } else {
      setGeneralForm(prev => ({
        ...prev,
        customerName: originalEmail.meta?.customerName || "",
        customerPhone: originalEmail.meta?.customerPhone || "",
        billingEmail: originalEmail.meta?.billingEmail || "",
        // ... other fields from originalEmail.meta
      }));
    }

    // Set email type
    setEmailType(originalEmail.emailType);

    // ✅ SET THE ORIGINAL MESSAGE-ID FOR THREADING
    setMessageId(originalEmail.meta?.messageId);

    setSuccessMessage(`Reply mode enabled. Replying to ${originalEmail.meta?.customerName || "customer"}`);
  };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const phone = (currentForm.customerPhone || "").trim();
//     const phoneRegex = /^[+0-9\s\-\(\)]{8,20}$/;

//     // Update validation for new name fields
//     if (!currentForm.customerFirstName) {
//       setErrorMessage("First name is required");
//       return;
//     }

//     if (!currentForm.customerLastName) {
//       setErrorMessage("Last name is required");
//       return;
//     }

//     if (!currentForm.customerPrefix) {
//       setErrorMessage("Title is required");
//       return;
//     }

//     // Validate DOB format if provided
//     if (currentForm.customerDOB) {
//       const dobDate = new Date(currentForm.customerDOB);
//       if (dobDate > new Date()) {
//         setErrorMessage("Date of birth cannot be in the future");
//         return;
//       }
//     }
//     if (phone === "") {
//       setErrorMessage("Phone number is required");
//       return;
//     }

//     if (!phoneRegex.test(phone)) {
//       setErrorMessage(
//         "Invalid phone number format. Use only numbers, spaces, +, -, () (8–20 characters)"
//       );
//       return;
//     }

//     // Additional validation for flight ticket form
//     if (isFlightTicketForm) {
//       if (!flightForm.confirmationNumber) {
//         setErrorMessage("Confirmation Number is required for flight tickets");
//         return;
//       }
//       if (!flightForm.airline) {
//         setErrorMessage("Airline Name is required");
//         return;
//       }
//       if (!flightForm.flightNumber) {
//         setErrorMessage("Flight Number is required");
//         return;
//       }
//       if (!flightForm.departure) {
//         setErrorMessage("Departure is required");
//         return;
//       }
//       if (!flightForm.arrival) {
//         setErrorMessage("Arrival is required");
//         return;
//       }
//       if (!flightForm.travelDate) {
//         setErrorMessage("Travel Date is required");
//         return;
//       }
//     }

//     // Validation for update type for flight-related emails
//     const flightRelatedTypes = ["exchange_ticket", "flight_cancellation", "flight_confirmation", "new_reservation"];
//     if (flightRelatedTypes.includes(emailType) && !currentForm.updateType) {
//       setErrorMessage("Update Type is required for flight-related emails");
//       return;
//     }

//     setLoading(true);
//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//       let requestData;

//       if (isFlightTicketForm) {
//         // For flight ticket forms
//         requestData = {
//           emailType,
//           customerPrefix: flightForm.customerPrefix,
//           customerFirstName: flightForm.customerFirstName,
//           customerMiddleName: flightForm.customerMiddleName,
//           customerLastName: flightForm.customerLastName,
//           customerDOB: flightForm.customerDOB,
//           customerGender: flightForm.customerGender,
//           // Keep full name for backward compatibility
//           customerName: `${flightForm.customerFirstName} ${flightForm.customerMiddleName ? flightForm.customerMiddleName + ' ' : ''}${flightForm.customerLastName}`,
//           ...flightForm,
//           senderBrand, // Make sure senderBrand is included
//           chargeReference:
//             senderBrand === "lowfare_studio" ? "LowfareStudio" :
//               senderBrand === "american_airlines" ? "American Airlines" : "Airline Desk",
//           templateUsed: null, // No templates for flight tickets
//           // ✅ ADD THIS: Pass originalMessageId for threading
//           originalMessageId: messageId || null,
//           // Include update fields for flight ticket forms
//           updateType: flightForm.updateType || "confirmed",
//           includeAgreement: flightForm.includeAgreement !== false,
//           includeChargeNote: flightForm.includeChargeNote !== false,
//           includeFareRules: flightForm.includeFareRules || false,
//           cardHolderName: flightForm.cardHolderName || "",
//           cardLastFour: flightForm.cardLastFour || "",
//           cardExpiry: flightForm.cardExpiry || "",
//           cardCVV: flightForm.cardCVV || "",
//           billingAddress: flightForm.billingAddress || "",
//           customerEmail: flightForm.customerEmail || "",
//           // NEW: Include parsed segments if available
//           parsedSegments: parsedSegments.length > 0 ? parsedSegments : []
//         };
//       } else {
//         // For general forms
//         requestData = {
//           emailType,
//           passengers: passengers.map(p => ({
//             prefix: p.prefix,
//             firstName: p.firstName,
//             middleName: p.middleName,
//             lastName: p.lastName,
//             dob: p.dob,
//             gender: p.gender
//           })),
//           // Keep customerName for backward compatibility
//           customerName: passengers.length > 0
//             ? `${passengers[0].prefix ? passengers[0].prefix.toUpperCase() + '.' : ''} ${passengers[0].firstName} ${passengers[0].middleName ? passengers[0].middleName + ' ' : ''}${passengers[0].lastName}`.trim()
//             : '',
//           customerPrefix: passengers[0]?.prefix || '',
//           customerFirstName: passengers[0]?.firstName || '',
//           customerMiddleName: passengers[0]?.middleName || '',
//           customerLastName: passengers[0]?.lastName || '',
//           customerDOB: passengers[0]?.dob || '',
//           customerGender: passengers[0]?.gender || '',
//           // customerPrefix: flightForm.customerPrefix,
//           // customerFirstName: flightForm.customerFirstName,
//           // customerMiddleName: flightForm.customerMiddleName,
//           // customerLastName: flightForm.customerLastName,
//           // customerDOB: flightForm.customerDOB,
//           // customerGender: flightForm.customerGender,
//           // Keep full name for backward compatibility
//           customerName: `${flightForm.customerFirstName} ${flightForm.customerMiddleName ? flightForm.customerMiddleName + ' ' : ''}${flightForm.customerLastName}`,
//           ...generalForm,
//           senderBrand, // Make sure senderBrand is included
//           templateUsed: selectedTemplate || null,
//           chargeReference:
//             senderBrand === "lowfare_studio" ? "LowfareStudio" :
//               senderBrand === "american_airlines" ? "American Airlines" : "Airline Desk",
//           // ✅ ADD THIS: Pass originalMessageId for threading
//           originalMessageId: messageId || null
//         };
//       }

//       console.log("Sending request data with originalMessageId:", messageId);
//       console.log("Full request data:", requestData);

//       const response = await API.post("/email/send", requestData);

//       console.log("Response received:", response.data);

//       // ✅ STORE THE MESSAGE-ID FROM RESPONSE FOR FUTURE REPLIES
//       if (response.data?.data?.messageId) {
//         setMessageId(response.data.data.messageId);
//         console.log("Message-ID stored for future replies:", response.data.data.messageId);
//       }

//       // Store booking data for payment page from backend response
//       if (response.data?.data?.bookingData) {
//         // Use booking data from backend response
//         setBookingData(response.data.data.bookingData);
//       } else {
//         // Fallback: create booking data from form
//         const bookingDataForPayment = {
//           customerName: currentForm.customerName,
//           customerEmail: currentForm.billingEmail,
//           customerPhone: currentForm.customerPhone,
//           bookingAmount: currentForm.bookingAmount || "0.00",
//           emailType: emailType,
//           senderBrand: senderBrand,
//           // ✅ Include messageId in booking data for threading
//           messageId: response.data?.data?.messageId || null,
//           ...(isFlightTicketForm && {
//             airline: flightForm.airline,
//             flightNumber: flightForm.flightNumber,
//             departure: flightForm.departure,
//             arrival: flightForm.arrival,
//             travelDate: flightForm.travelDate,
//             confirmationNumber: flightForm.confirmationNumber
//           }),
//           ...(emailType === "holiday_package" && {
//             packageName: generalForm.packageName,
//             packagePrice: generalForm.packagePrice,
//             packageNights: generalForm.packageNights
//           })
//         };
//         setBookingData(bookingDataForPayment);
//       }

//       setEmailSent(true);

//       const greeting = response.data?.data?.dynamicGreeting ? `(${response.data.data.dynamicGreeting})` : '';
//       setSuccessMessage(`Email sent successfully! ${greeting} Click "Pay Now" below to proceed to payment.`);

//       // ✅ Show debugging info about threading
//       if (messageId) {
//         console.log("This is a REPLY to thread with Message-ID:", messageId);
//       } else {
//         console.log("This is a NEW thread. Generated Message-ID:", response.data?.data?.messageId);
//       }

//     } catch (err) {
//       console.error("Error sending email:", err);
//       console.error("Error response:", err.response?.data);

//       // Show detailed error message
//       const errorMsg = err.response?.data?.message ||
//         err.response?.data?.error ||
//         "Failed to send email. Please check the console for details.";
//       setErrorMessage(errorMsg);

//       setEmailSent(false);
//       setBookingData(null);
//     } finally {
//       setLoading(false);
//     }


//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation for at least one passenger
  if (passengers.length === 0) {
    setErrorMessage("At least one passenger is required");
    return;
  }

  // Validate each passenger has required fields
  for (let i = 0; i < passengers.length; i++) {
    const p = passengers[i];
    if (!p.prefix) {
      setErrorMessage(`Passenger ${i + 1}: Title is required`);
      return;
    }
    if (!p.firstName) {
      setErrorMessage(`Passenger ${i + 1}: First name is required`);
      return;
    }
    if (!p.lastName) {
      setErrorMessage(`Passenger ${i + 1}: Last name is required`);
      return;
    }
  }

  const phone = (currentForm.customerPhone || "").trim();
  const phoneRegex = /^[+0-9\s\-\(\)]{8,20}$/;

  if (phone === "") {
    setErrorMessage("Phone number is required");
    return;
  }

  if (!phoneRegex.test(phone)) {
    setErrorMessage(
      "Invalid phone number format. Use only numbers, spaces, +, -, () (8–20 characters)"
    );
    return;
  }

  // Additional validation for flight ticket form
  if (isFlightTicketForm) {
    if (!flightForm.confirmationNumber) {
      setErrorMessage("Confirmation Number is required for flight tickets");
      return;
    }
    if (!flightForm.airline) {
      setErrorMessage("Airline Name is required");
      return;
    }
    if (!flightForm.flightNumber) {
      setErrorMessage("Flight Number is required");
      return;
    }
    if (!flightForm.departure) {
      setErrorMessage("Departure is required");
      return;
    }
    if (!flightForm.arrival) {
      setErrorMessage("Arrival is required");
      return;
    }
    if (!flightForm.travelDate) {
      setErrorMessage("Travel Date is required");
      return;
    }
  }

  // Validation for update type for flight-related emails
  const flightRelatedTypes = ["exchange_ticket", "flight_cancellation", "flight_confirmation", "new_reservation"];
  if (flightRelatedTypes.includes(emailType) && !currentForm.updateType) {
    setErrorMessage("Update Type is required for flight-related emails");
    return;
  }

  setLoading(true);
  setSuccessMessage("");
  setErrorMessage("");

  try {
    let requestData;

    // Get primary passenger for backward compatibility
    const primaryPassenger = passengers[0] || {};

    if (isFlightTicketForm) {
      // For flight ticket forms
      requestData = {
        emailType,
        // ✅ Send all passengers
        passengers: passengers.map(p => ({
          prefix: p.prefix,
          firstName: p.firstName,
          middleName: p.middleName,
          lastName: p.lastName,
          dob: p.dob,
          gender: p.gender
        })),
        // Keep single fields for backward compatibility
        customerPrefix: primaryPassenger.prefix || "",
        customerFirstName: primaryPassenger.firstName || "",
        customerMiddleName: primaryPassenger.middleName || "",
        customerLastName: primaryPassenger.lastName || "",
        customerDOB: primaryPassenger.dob || "",
        customerGender: primaryPassenger.gender || "",
        customerName: `${primaryPassenger.prefix ? primaryPassenger.prefix.toUpperCase() + '.' : ''} ${primaryPassenger.firstName} ${primaryPassenger.middleName ? primaryPassenger.middleName + ' ' : ''}${primaryPassenger.lastName}`.trim(),
        ...flightForm,
        senderBrand,
        chargeReference:
          senderBrand === "lowfare_studio" ? "LowfareStudio" :
            senderBrand === "american_airlines" ? "American Airlines" : "Airline Desk",
        templateUsed: null,
        originalMessageId: messageId || null,
        updateType: flightForm.updateType || "confirmed",
        includeAgreement: flightForm.includeAgreement !== false,
        includeChargeNote: flightForm.includeChargeNote !== false,
        includeFareRules: flightForm.includeFareRules || false,
        cardHolderName: flightForm.cardHolderName || "",
        cardLastFour: flightForm.cardLastFour || "",
        cardExpiry: flightForm.cardExpiry || "",
        cardCVV: flightForm.cardCVV || "",
        billingAddress: flightForm.billingAddress || "",
        customerEmail: flightForm.customerEmail || "",
        parsedSegments: parsedSegments.length > 0 ? parsedSegments : []
      };
    } else {
      // For general forms
      requestData = {
        emailType,
        // ✅ Send all passengers
        passengers: passengers.map(p => ({
          prefix: p.prefix,
          firstName: p.firstName,
          middleName: p.middleName,
          lastName: p.lastName,
          dob: p.dob,
          gender: p.gender
        })),
        // Keep single fields for backward compatibility
        customerPrefix: primaryPassenger.prefix || "",
        customerFirstName: primaryPassenger.firstName || "",
        customerMiddleName: primaryPassenger.middleName || "",
        customerLastName: primaryPassenger.lastName || "",
        customerDOB: primaryPassenger.dob || "",
        customerGender: primaryPassenger.gender || "",
        customerName: `${primaryPassenger.prefix ? primaryPassenger.prefix.toUpperCase() + '.' : ''} ${primaryPassenger.firstName} ${primaryPassenger.middleName ? primaryPassenger.middleName + ' ' : ''}${primaryPassenger.lastName}`.trim(),
        ...generalForm,
        senderBrand,
        templateUsed: selectedTemplate || null,
        chargeReference:
          senderBrand === "lowfare_studio" ? "LowfareStudio" :
            senderBrand === "american_airlines" ? "American Airlines" : "Airline Desk",
        originalMessageId: messageId || null
      };
    }

    console.log("Sending request with passengers:", passengers.length);
    console.log("Request data:", requestData);

    const response = await API.post("/email/send", requestData);

    console.log("Response received:", response.data);

    if (response.data?.data?.messageId) {
      setMessageId(response.data.data.messageId);
    }

    // Store booking data for payment page
    const bookingDataForPayment = {
      customerName: currentForm.customerName || requestData.customerName,
      customerEmail: currentForm.billingEmail,
      customerPhone: currentForm.customerPhone,
      bookingAmount: currentForm.bookingAmount || "0.00",
      emailType: emailType,
      senderBrand: senderBrand,
      passengers: passengers.length, // ✅ Store passenger count
      messageId: response.data?.data?.messageId || null,
      ...(isFlightTicketForm && {
        airline: flightForm.airline,
        flightNumber: flightForm.flightNumber,
        departure: flightForm.departure,
        arrival: flightForm.arrival,
        travelDate: flightForm.travelDate,
        confirmationNumber: flightForm.confirmationNumber
      }),
      ...(emailType === "holiday_package" && {
        packageName: generalForm.packageName,
        packagePrice: generalForm.packagePrice,
        packageNights: generalForm.packageNights
      })
    };

    setBookingData(bookingDataForPayment);
    setEmailSent(true);

    const greeting = response.data?.data?.dynamicGreeting ? `(${response.data.data.dynamicGreeting})` : '';
    setSuccessMessage(`Email sent successfully with ${passengers.length} passenger(s)! ${greeting}`);

  } catch (err) {
    console.error("Error sending email:", err);
    const errorMsg = err.response?.data?.message ||
      err.response?.data?.error ||
      "Failed to send email";
    setErrorMessage(errorMsg);
    setEmailSent(false);
    setBookingData(null);
  } finally {
    setLoading(false);
  }
};

  const inputClass =
    "w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

  const labelClass = "text-sm font-medium text-gray-700 mb-2 block";

  const sectionClass = "bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200";

  // Filter templates by current email type
  const filteredTemplates = templates.filter(t => t.emailType === emailType);

  // Check if email type is one of the flight-related types
  const isFlightRelatedType =
    emailType === "exchange_ticket" ||
    emailType === "flight_cancellation" ||
    emailType === "flight_confirmation" ||
    emailType === "new_reservation";

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Send Customer Email</h1>

      <div className="max-w-full mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 pt-2 pb-1">
            <h2 className="text-xl font-bold text-white">Select category and fill details</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Category - always visible */}
              <div>
                <label className={labelClass}>Email Category</label>
                <select
                  value={emailType}
                  onChange={handleEmailTypeChange}
                  className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundSize: "12px",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value="new_reservation">New Reservation (Flight Ticket)</option>
                  <option value="exchange_ticket">Exchange Ticket</option>
                  <option value="flight_cancellation">Flight Cancellation</option>
                  <option value="refund_request">Refund Request</option>
                  <option value="seat_addons">Seat / Add-ons</option>
                  <option value="name_correction">Name Correction</option>
                  <option value="add_pet">Add Pet</option>
                  <option value="flight_confirmation">Flight Confirmation (Flight Ticket)</option>
                  <option value="hotel_booking">Hotel Booking</option>
                  <option value="car_rental">Car Rental</option>
                  <option value="customer_support">Customer Support</option>
                  <option value="holiday_package">Holiday Package</option>
                  <option value="travel_insurance">Travel Insurance</option>
                </select>
              </div>

              {/* Sender / Charge Reference - always visible */}
              <div>
                <label className={labelClass}>Sender / Charge Reference</label>
                <select
                  value={senderBrand}
                  onChange={(e) => setSenderBrand(e.target.value)}
                  className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundSize: "12px",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value="airline_desk">Airline Desk</option>
                  <option value="american_airlines">American Airlines</option>
                  <option value="lowfare_studio">Lowfare Studio</option>
                </select>
              </div>
            </div>

            {/* Template Selection Section - ONLY FOR HOLIDAY PACKAGE */}
            {emailType === "holiday_package" && (
              <section className={sectionClass}>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                    Template Selection
                    <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Optional</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowTemplateModal(true)}
                    className="cursor-pointer text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    Save Current as Template
                  </button>
                </div>

                {loadingTemplates ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  </div>
                ) : filteredTemplates.length > 0 ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredTemplates.map(template => (
                        <div
                          key={template._id}
                          onClick={() => handleTemplateSelect(template._id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${selectedTemplate === template._id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                            }`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-800 truncate">
                              {template.name}
                            </h4>
                            <button
                              type="button"
                              onClick={(e) => deleteTemplate(template._id, e)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              ×
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Type: {template.emailType.replace('_', ' ')}
                          </p>
                          {template.data?.packageNights && (
                            <p className="text-xs text-gray-600 mt-1">
                              {template.data.packageNights} nights • ${template.data.packagePrice || "0"}
                            </p>
                          )}
                          {template.data?.hotelName && (
                            <p className="text-xs text-gray-600 mt-1">
                              Hotel: {template.data.hotelName}
                            </p>
                          )}
                          {template.data?.carType && (
                            <p className="text-xs text-gray-600 mt-1">
                              Car: {template.data.carType}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    {selectedTemplate && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ Template loaded. You can now edit the details below.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-500">No templates saved for holiday packages yet.</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Fill in package details below and click "Save Current as Template" to create one.
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* NEW: Itinerary Parser Section - ONLY FOR FLIGHT TICKET FORMS */}
            {(isFlightTicketForm && !showItineraryBox) && (
              <section className={sectionClass}>
                <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                  Quick Itinerary Import
                  <span className="ml-2 text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">Optional</span>
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Quickly import flight details from GDS/Sabre/Amadeus itineraries. Paste raw itinerary text to auto-fill the form.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowItineraryBox(true)}
                    className="cursor-pointer w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Import from Itinerary Text
                  </button>
                  <button
                    type="button"
                    onClick={handlePasteSample}
                    className="cursor-pointer w-full border-2 border-dashed border-gray-300 hover:border-teal-400 hover:bg-teal-50 text-gray-600 hover:text-teal-700 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Paste Sample Itinerary
                  </button>
                </div>
              </section>
            )}

            {/* NEW: Itinerary Text Box */}
            {(isFlightTicketForm && showItineraryBox) && (
              <section className={sectionClass}>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                    Paste Raw Itinerary (GDS/Sabre/Amadeus)
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowItineraryBox(false)}
                    className="cursor-pointer text-sm text-gray-500 hover:text-gray-700"
                  >
                    Hide
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-mono">GDS Itinerary Format</span>
                      <span className="text-xs text-teal-300">Supports Amadeus, Sabre, Galileo</span>
                    </div>
                    <pre className="text-xs font-mono overflow-x-auto whitespace-pre">
                      RP/DELAM0100/DELAM0100           ABC123/WS  10FEB26{'\n'}
                      1. EK 513 Y 10FEB 3 DELDXB HK1 2230 0045+1{'\n'}
                      OPERATED BY EMIRATES{'\n'}
                      TERMINAL 3{'\n'}
                      2. EK 202 Y 11FEB 4 DXBLHR HK1 0915 1345{'\n'}
                      OPERATED BY EMIRATES{'\n'}
                      TERMINAL 3{'\n\n'}
                      PASSENGER NAME:{'\n'}
                      1. SHUKLA/KRISHNA MR{'\n\n'}
                      TKT-ETKT 1761234567890{'\n'}
                      FARE USD 520.00{'\n'}
                      TAX USD 80.00{'\n'}
                      TOTAL USD 600.00
                    </pre>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Paste itinerary text below (copy-paste from GDS)
                      <span className="ml-2 text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">Recommended</span>
                    </label>
                    <textarea
                      value={itineraryText}
                      onChange={(e) => setItineraryText(e.target.value)}
                      rows={8}
                      placeholder="Paste your raw itinerary text here...
Example:
RP/DELAM0100/DELAM0100           ABC123/WS  10FEB26
  1. EK 513 Y 10FEB 3 DELDXB HK1 2230 0045+1
     OPERATED BY EMIRATES
     TERMINAL 3
  2. EK 202 Y 11FEB 4 DXBLHR HK1 0915 1345
     OPERATED BY EMIRATES
     TERMINAL 3

PASSENGER NAME:
  1. SHUKLA/KRISHNA MR

TKT-ETKT 1761234567890
FARE USD 520.00
TAX USD 80.00
TOTAL USD 600.00"
                      className={`${inputClass} font-mono text-sm`}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={parseItinerary}
                      disabled={isParsingItinerary || !itineraryText.trim()}
                      className="cursor-pointer flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium py-3 rounded-xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                      {isParsingItinerary ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Parsing...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Parse Itinerary & Auto-fill
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handlePasteSample}
                      className="cursor-pointer px-4 py-3 border border-gray-300 hover:border-teal-400 hover:bg-teal-50 text-gray-600 hover:text-teal-700 rounded-xl transition-all"
                    >
                      Sample
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setItineraryText("");
                        setParsedSegments([]);
                      }}
                      className="cursor-pointer px-4 py-3 border border-gray-300 hover:border-red-300 hover:bg-red-50 text-gray-600 hover:text-red-700 rounded-xl transition-all"
                    >
                      Clear
                    </button>
                  </div>

                  {parsedSegments.length > 0 && (
                    <div className="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-teal-800">
                          ✓ Parsed {parsedSegments.length} flight segment(s)
                        </h4>
                        <button
                          type="button"
                          onClick={() => setParsedSegments([])}
                          className="text-xs text-teal-600 hover:text-teal-800"
                        >
                          Clear
                        </button>
                      </div>

                      <div className="space-y-2">
                        {parsedSegments.map((_, index) => {
                          if (index % 2 !== 0) return null;

                          const left = parsedSegments[index];
                          const right = parsedSegments[index + 1];

                          return (
                            <div
                              key={index}
                              className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg border"
                            >
                              {/* LEFT SEGMENT */}
                              {left && (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 font-medium">
                                      <span className="w-8 h-8 flex items-center justify-center bg-teal-100 text-teal-700 rounded-full text-sm">
                                        {left.airline}
                                      </span>
                                      <span>{left.airline} {left.flightNumber}</span>
                                    </div>
                                    <span className="font-medium">
                                      {left.departureTime} → {left.arrivalTime}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>
                                      {left.departure} → {left.arrival} • {left.date} • {left.cabinClass}
                                    </span>
                                    <span className="text-xs">Segment {index + 1}</span>
                                  </div>
                                </div>
                              )}

                              {/* RIGHT SEGMENT */}
                              {right && (
                                <div className="space-y-1 border-l pl-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 font-medium">
                                      <span className="w-8 h-8 flex items-center justify-center bg-teal-100 text-teal-700 rounded-full text-sm">
                                        {right.airline}
                                      </span>
                                      <span>{right.airline} {right.flightNumber}</span>
                                    </div>
                                    <span className="font-medium">
                                      {right.departureTime} → {right.arrivalTime}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>
                                      {right.departure} → {right.arrival} • {right.date} • {right.cabinClass}
                                    </span>
                                    <span className="text-xs">Segment {index + 2}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-sm text-teal-700 mt-3">
                        Flight details have been auto-filled below. You can edit them if needed.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Customer Information */}
          
            <section className={sectionClass}>
              <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Customer Information
              </h3>
             

              {/* Passenger Details Section */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-700">Passenger Details</h4>
                  <button
                    type="button"
                    onClick={addPassenger}
                    className="cursor-pointer text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Passenger
                  </button>
                </div>

                {passengers.map((passenger, index) => (
                  <div key={passenger.id} className="mb-6 pb-6 border-b border-blue-200 last:border-b-0 last:pb-0 last:mb-0">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="text-sm font-semibold text-gray-700">
                        Passenger {index + 1}
                        {index === 0 && <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">Primary</span>}
                      </h5>
                      {passengers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePassenger(passenger.id)}
                          className="cursor-pointer text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Title/Prefix */}
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Title *</label>
                        <select
                          value={passenger.prefix}
                          onChange={(e) => handlePassengerChange(passenger.id, 'prefix', e.target.value)}
                          className={`${inputClass} cursor-pointer`}
                          required
                        >
                          {prefixOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* First Name */}
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">First Name *</label>
                        <input
                          type="text"
                          placeholder="First Name"
                          value={passenger.firstName}
                          onChange={(e) => handlePassengerChange(passenger.id, 'firstName', e.target.value)}
                          className={inputClass}
                          required
                        />
                      </div>

                      {/* Middle Name */}
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Middle Name</label>
                        <input
                          type="text"
                          placeholder="Middle Name"
                          value={passenger.middleName}
                          onChange={(e) => handlePassengerChange(passenger.id, 'middleName', e.target.value)}
                          className={inputClass}
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Last Name *</label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={passenger.lastName}
                          onChange={(e) => handlePassengerChange(passenger.id, 'lastName', e.target.value)}
                          className={inputClass}
                          required
                        />
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Date of Birth</label>
                        <input
                          type="date"
                          value={passenger.dob}
                          onChange={(e) => handlePassengerChange(passenger.id, 'dob', e.target.value)}
                          className={`${inputClass} cursor-pointer`}
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Gender</label>
                        <select
                          value={passenger.gender}
                          onChange={(e) => handlePassengerChange(passenger.id, 'gender', e.target.value)}
                          className={`${inputClass} cursor-pointer`}
                        >
                          {genderOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Passenger Summary */}
                {passengers.length > 0 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">
                      <span className="font-medium">Total Passengers:</span> {passengers.length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Passenger Names:</span>{' '}
                      {passengers.map((p, i) => {
                        const prefix = prefixOptions.find(opt => opt.value === p.prefix)?.label || '';
                        const name = [prefix, p.firstName, p.middleName, p.lastName].filter(Boolean).join(' ');
                        return name || `Passenger ${i + 1}`;
                      }).join(', ')}
                    </p>
                  </div>
                )}


                {/* Passenger Summary */}
{passengers.length > 0 && (
  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
    <div className="flex justify-between items-center">
      <h4 className="font-medium text-blue-800">
        <span className="mr-2">👥</span> 
        Passenger Summary ({passengers.length})
      </h4>
      <button
        type="button"
        onClick={addPassenger}
        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
      >
        + Add More
      </button>
    </div>
    
    <div className="mt-3 space-y-2">
      {passengers.map((p, idx) => {
        const prefixLabel = prefixOptions.find(opt => opt.value === p.prefix)?.label || '';
        const fullName = [prefixLabel, p.firstName, p.middleName, p.lastName]
          .filter(Boolean)
          .join(' ');
        
        return (
          <div key={p.id} className="flex justify-between items-center text-sm bg-white p-2 rounded border border-blue-100">
            <div>
              <span className="font-medium text-gray-700">{idx + 1}.</span>
              <span className="ml-2 text-gray-800">{fullName || `Passenger ${idx + 1}`}</span>
              {p.dob && <span className="ml-3 text-xs text-gray-500">DOB: {p.dob}</span>}
              {p.gender && <span className="ml-3 text-xs text-gray-500">Gender: {p.gender}</span>}
            </div>
            {passengers.length > 1 && (
              <button
                type="button"
                onClick={() => removePassenger(p.id)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                Remove
              </button>
            )}
          </div>
        );
      })}
    </div>
    
    <div className="mt-3 text-xs text-blue-600 bg-white p-2 rounded border border-blue-100">
      <span className="font-medium">Total Passengers:</span> {passengers.length}
    </div>
  </div>
)}
              </div>

              {/* Contact Information */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input
                    name="customerPhone"
                    type="tel"
                    placeholder="Only numbers, spaces, +, -, () allowed (8–20 characters)"
                    className={inputClass}
                    onChange={handleChange}
                    value={currentForm.customerPhone}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Billing Email *</label>
                  <input
                    name="billingEmail"
                    type="email"
                    placeholder="customer@example.com"
                    className={inputClass}
                    onChange={handleChange}
                    value={currentForm.billingEmail}
                    required
                  />
                </div>
              </div>

              {/* Full Name Display (for verification) */}
              {(currentForm.customerFirstName || currentForm.customerLastName) && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    <span className="font-medium">Full Name:</span>
                    {/* <span className="ml-2">
          {currentForm.customerPrefix ? 
            prefixOptions.find(p => p.value === currentForm.customerPrefix)?.label + ' ' : ''}
          {currentForm.customerFirstName} 
          {currentForm.customerMiddleName ? ' ' + currentForm.customerMiddleName : ''} 
          {currentForm.customerLastName}
        </span> */}


                    <span className="ml-2">
                      {[
                        prefixOptions.find(p => p.value === currentForm.customerPrefix)?.label,
                        currentForm.customerFirstName,
                        currentForm.customerMiddleName,
                        currentForm.customerLastName
                      ]
                        .filter(Boolean)
                        .join(" ")
                      }
                    </span>

                  </p>
                </div>
              )}
            </section>




            {/* Reservation Update Details for flight-related email types */}
            {isFlightRelatedType && (
              <section className={sectionClass}>
                <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Reservation Update Details
                </h3>

                {/* Part 1: Update Type */}
                <div className="mb-6">
                  <label className={labelClass}>Update Type *</label>
                  <select
                    name="updateType"
                    className={`${inputClass} cursor-pointer`}
                    onChange={handleChange}
                    value={currentForm.updateType || "confirmed"}
                    required
                  >
                    {updateTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    Select the appropriate action taken on the reservation
                  </p>
                </div>

                {/* Add Baggage Information Section */}
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <label className={labelClass}>Baggage Information (Optional)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">
                        Check-in Baggage
                      </label>
                      <select
                        name="checkInBaggage"
                        className={inputClass}
                        onChange={handleChange}
                        value={currentForm.checkInBaggage || ""}
                      >
                        <option value="">Select option</option>
                        <option value="0 kg">0 kg</option>
                        <option value="15 kg">15 kg</option>
                        <option value="1 pc">1 piece</option>
                        <option value="2 pc">2 pieces</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">
                        Carry-on Baggage
                      </label>
                      <select
                        name="carryOnBaggage"
                        className={inputClass}
                        onChange={handleChange}
                        value={currentForm.carryOnBaggage || ""}
                      >
                        <option value="">Select option</option>
                        <option value="0 kg">0 kg</option>
                        <option value="5 kg">5 kg</option>
                        <option value="7 kg">7 kg</option>
                        <option value="10 kg">10 kg</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Part 2: "I Agree" Request */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <label className={labelClass}>Customer Agreement Request</label>
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        Please reply to this email saying <strong>"I Agree"</strong>, enabling us to proceed with the changes.
                      </p>
                      <div className="mt-2 flex items-center">
                        <input
                          type="checkbox"
                          id="includeAgreement"
                          name="includeAgreement"
                          checked={currentForm.includeAgreement !== false}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="includeAgreement" className="ml-2 text-sm text-gray-700">
                          Include "I Agree" request in email
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part 3: Credit Card Information (Optional) */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className={labelClass}>Payment Card Information (Optional)</label>
                    <span className="text-xs text-gray-500">For reference only</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Cardholder Name</label>
                      <input
                        name="cardHolderName"
                        placeholder="Cardholder Name"
                        className={inputClass}
                        onChange={handleChange}
                        value={currentForm.cardHolderName || ""}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Card Last 4 Digits</label>
                      <input
                        name="cardLastFour"
                        placeholder="XXXX"
                        maxLength="4"
                        className={inputClass}
                        onChange={handleChange}
                        value={currentForm.cardLastFour || ""}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Expiry Date</label>
                      <input
                        name="cardExpiry"
                        placeholder="MM/YY"
                        className={inputClass}
                        onChange={handleChange}
                        value={currentForm.cardExpiry || ""}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">CVV</label>
                      <input
                        name="cardCVV"
                        placeholder="***"
                        type="password"
                        maxLength="4"
                        className={inputClass}
                        onChange={handleChange}
                        value={currentForm.cardCVV || ""}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Billing Address</label>
                      <input
                        name="billingAddress"
                        placeholder="Billing Address"
                        className={inputClass}
                        onChange={handleChange}
                        value={currentForm.billingAddress || ""}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Customer Email</label>
                      <input
                        name="customerEmail"
                        type="email"
                        placeholder="customer@example.com"
                        className={inputClass}
                        onChange={handleChange}
                        value={currentForm.customerEmail || ""}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    This information is for internal reference and will be included in the email body if provided
                  </p>
                </div>

                {/* Part 4: Charge Reference Note */}
                <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <label className={labelClass}>Billing Statement Note</label>
                  <p className="text-sm text-gray-700">
                    Please note that you might see the charges under{" "}
                    <strong>
                      {senderBrand === "lowfare_studio"
                        ? "LowfareStudio"
                        : senderBrand === "american_airlines"
                          ? "American Airlines"
                          : "Airline Desk"
                      }
                    </strong>{" "}
                    on your billing statement.
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Your Debit/Credit card may have one or multiple charges but the total quoted price will stay the same.
                  </p>
                  <div className="mt-2 flex items-center">
                    <input
                      type="checkbox"
                      id="includeChargeNote"
                      name="includeChargeNote"
                      checked={currentForm.includeChargeNote !== false}
                      onChange={handleChange}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="includeChargeNote" className="ml-2 text-sm text-gray-700">
                      Include billing statement note in email
                    </label>
                  </div>
                </div>

                {/* Part 5: Fare Rules (for flight only) */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <label className={labelClass}>Fare Rules (For Flight Tickets)</label>
                  <div className="mt-2">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="includeFareRules"
                        name="includeFareRules"
                        checked={currentForm.includeFareRules || false}
                        onChange={handleChange}
                        className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <label htmlFor="includeFareRules" className="ml-2 text-sm text-gray-700">
                        Include standard fare rules in email
                      </label>
                    </div>

                    {currentForm.includeFareRules && (
                      <div className="mt-3 text-sm text-gray-600 space-y-1 pl-4">
                        <p>1. Ticket is Non-Refundable & Non-Changeable.</p>
                        <p>2. Please contact us 72 hours prior to departure for reconfirmation of booking.</p>
                        <p>3. There will be No Compensation in case of any Schedule Change.</p>
                        <p>4. Service Fee of USD 50 per passenger is applicable for any special request.</p>
                        <p>5. In case of No-Show ticket has No Value.</p>
                        <p>6. For any changes give us a call back at least 24 hours prior to departure.</p>
                        <p>7. Special request confirmation will be given by Airlines only.</p>
                        <p>8. Name changes are not permitted once the reservation has been confirmed.</p>
                        <p>9. The name on each ticket must match a valid photo ID.</p>
                        <p>10. IDs should be valid for 6 months from the date of last Flight.</p>
                        <p>11. If your credit card declines, we will notify you by email within 24 hours.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Flight Ticket Details (only for new_reservation and flight_confirmation) */}
            {isFlightTicketForm && (
              <>
                <section className={sectionClass}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                    Flight Ticket Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Booking Reference / PNR *</label>
                      <input
                        name="confirmationNumber"
                        placeholder="e.g., ABC123"
                        className={inputClass}
                        onChange={handleChange}
                        value={flightForm.confirmationNumber}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Airline Name *</label>
                      <input
                        name="airline"
                        placeholder="e.g., Delta Airlines"
                        className={inputClass}
                        onChange={handleChange}
                        value={flightForm.airline}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Flight Number *</label>
                      <input
                        name="flightNumber"
                        placeholder="e.g., AA1234"
                        className={inputClass}
                        onChange={handleChange}
                        value={flightForm.flightNumber}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Departure *</label>
                      <input
                        name="departure"
                        placeholder="e.g., New York - JFK"
                        className={inputClass}
                        onChange={handleChange}
                        value={flightForm.departure}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Arrival *</label>
                      <input
                        name="arrival"
                        placeholder="e.g., London - LHR"
                        className={inputClass}
                        onChange={handleChange}
                        value={flightForm.arrival}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Travel Date *</label>
                      <input
                        type="date"
                        name="travelDate"
                        className={inputClass}
                        onChange={handleChange}
                        value={flightForm.travelDate}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Cabin Class *</label>
                      <select
                        name="cabinClass"
                        className={`${inputClass} cursor-pointer`}
                        value={flightForm.cabinClass}
                        onChange={handleChange}
                        required
                      >
                        {cabinClassOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Add Baggage fields here */}
                    <div>
                      <label className={labelClass}>Check-in Baggage</label>
                      <select
                        name="checkInBaggage"
                        className={`${inputClass} cursor-pointer`}
                        value={flightForm.checkInBaggage}
                        onChange={handleChange}
                      >
                        {checkInBaggageOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Carry-on Baggage</label>
                      <select
                        name="carryOnBaggage"
                        className={`${inputClass} cursor-pointer`}
                        value={flightForm.carryOnBaggage}
                        onChange={handleChange}
                      >
                        {carryOnBaggageOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Fare Type *</label>
                      <select
                        name="fareType"
                        className={`${inputClass} cursor-pointer`}
                        value={flightForm.fareType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Fare Type *</option>
                        {fareTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Departure Time (Optional)</label>
                      <input
                        type="text"
                        name="departureTime"
                        placeholder="HH:MM"
                        className={inputClass}
                        value={flightForm.departureTime}
                        onFocus={(e) => (e.target.type = "time")}
                        onBlur={(e) => !e.target.value && (e.target.type = "text")}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Arrival Time (Optional)</label>
                      <input
                        type="text"
                        name="arrivalTime"
                        placeholder="HH:MM"
                        className={inputClass}
                        value={flightForm.arrivalTime}
                        onFocus={(e) => (e.target.type = "time")}
                        onBlur={(e) => !e.target.value && (e.target.type = "text")}
                        onChange={handleChange}
                      />
                    </div>


                    {/* ✅ ADD CONNECTION TIME FIELD HERE */}
                    <div>
                      <label className={labelClass}>Connection/Waiting Time</label>
                      <input
                        name="connectionTime"
                        placeholder="e.g., 2h 30m or 150 minutes"
                        className={inputClass}
                        onChange={handleChange}
                        value={flightForm.connectionTime}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Time between flights or waiting time
                      </p>
                    </div>




                    <div>
                      <label className={labelClass}>Departure Terminal (Optional)</label>
                      <input
                        name="departureTerminal"
                        placeholder="e.g., T1"
                        className={inputClass}
                        onChange={handleChange}
                        value={flightForm.departureTerminal}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Arrival Terminal (Optional)</label>
                      <input
                        name="arrivalTerminal"
                        placeholder="e.g., T2"
                        className={inputClass}
                        onChange={handleChange}
                        value={flightForm.arrivalTerminal}
                      />
                    </div>
                    {/* <div>
                      <label className={labelClass}>Ticket Number (Optional)</label>
                      <input
                        name="ticketNumber"
                        placeholder="e.g., 00123456789"
                        className={inputClass}
                        onChange={handleChange}
                        value={flightForm.ticketNumber}
                      />
                    </div> */}

                    <div>
                      <label className={labelClass}>Ticket Number (Optional)</label>
                      <input
                        name="ticketNumber"
                        placeholder="e.g., 00123456789"
                        className={inputClass}
                        onChange={handleChange}
                        value={flightForm.ticketNumber}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty to show "UNTICKETED" on ticket
                      </p>
                    </div>
                  </div>
                </section>

                {/* Payment Information for Flight Ticket */}
                <section className={sectionClass}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-5">Payment Information</h3>
                  <div className="max-w-md">
                    <label className={labelClass}>Booking Amount (USD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      name="bookingAmount"
                      placeholder="0.00"
                      className={inputClass}
                      onChange={handleChange}
                      value={flightForm.bookingAmount}
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Charges will reflect as{" "}
                    <span className="font-semibold text-gray-800">
                      {senderBrand === "lowfare_studio"
                        ? "LowfareStudio"
                        : senderBrand === "american_airlines"
                          ? "American Airlines"
                          : "Airline Desk"}
                    </span>{" "}
                    on customer statement.
                  </p>
                </section>

                {/* Custom Message for Flight Ticket */}
                <section className={sectionClass}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-5">Additional Notes</h3>
                  <textarea
                    name="customMessage"
                    rows="4"
                    placeholder="Additional notes for customer..."
                    className={`${inputClass} resize-none`}
                    onChange={handleChange}
                    value={flightForm.customMessage}
                  />
                </section>
              </>
            )}

            {/* GENERAL FORM (for other email types) */}
            {!isFlightRelatedType && (
              <>
                {/* NEW: Dynamic Greeting Information Section */}
                <section className={sectionClass}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                    Enquiry Details (For Personalized Greeting)
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Optional</span>
                  </h3>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-4">
                      These fields help personalize the greeting in the email. Fill based on what the customer enquired about.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-5">
                      <div>
                        <label className={labelClass}>Customer's Search Query</label>
                        <input
                          name="searchQuery"
                          placeholder="e.g., 'flights to Dubai' or 'Kashmir packages'"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.searchQuery}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          What the customer searched for
                        </p>
                      </div>
                      <div>
                        <label className={labelClass}>Service Category</label>
                        <select
                          name="category"
                          className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
                          onChange={handleChange}
                          value={generalForm.category}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundSize: "12px",
                            backgroundPosition: "right 1rem center",
                          }}
                        >
                          <option value="">Select category</option>
                          <option value="flight">Flight Booking</option>
                          <option value="hotel">Hotel Booking</option>
                          <option value="package">Holiday Package</option>
                          <option value="car_rental">Car Rental</option>
                          <option value="cruise">Cruise</option>
                          <option value="visa">Visa Assistance</option>
                          <option value="insurance">Travel Insurance</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                          Type of service enquired
                        </p>
                      </div>
                      <div>
                        <label className={labelClass}>Destination</label>
                        <input
                          name="destination"
                          placeholder="e.g., Kashmir, Manali, Goa, Dubai"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.destination}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Specific destination if known
                        </p>
                      </div>
                    </div>
                    {/* Preview of greeting */}
                    {(generalForm.searchQuery || generalForm.category || generalForm.destination) && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Preview greeting:</span>
                          <span className="italic ml-2">
                            "Thank you for your enquiry regarding the {generalForm.destination ? `${generalForm.destination}` : generalForm.category ? `${generalForm.category} booking` : 'travel enquiry'}."
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Package-specific fields for holiday packages */}
                {emailType === "holiday_package" && (
                  <section className={sectionClass}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                      Package Details
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <div>
                        <label className={labelClass}>Package Name *</label>
                        <input
                          name="packageName"
                          placeholder="e.g., Kashmir 5 Nights Package"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.packageName}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Number of Nights *</label>
                        <input
                          name="packageNights"
                          type="number"
                          placeholder="e.g., 5"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.packageNights}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Package Price (USD) *</label>
                        <input
                          name="packagePrice"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.packagePrice}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Start Date</label>
                        <input
                          type="date"
                          name="packageStartDate"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.packageStartDate}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>End Date</label>
                        <input
                          type="date"
                          name="packageEndDate"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.packageEndDate}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Number of Persons</label>
                        <input
                          name="numberOfPersons"
                          type="number"
                          placeholder="e.g., 2"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.numberOfPersons}
                        />
                      </div>
                    </div>
                  </section>
                )}

                {/* Hotel-specific fields */}
                {emailType === "hotel_booking" && (
                  <section className={sectionClass}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-5">Hotel Details</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Hotel Name</label>
                        <input
                          name="hotelName"
                          placeholder="e.g., Taj Palace"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.hotelName}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Room Type</label>
                        <input
                          name="roomType"
                          placeholder="e.g., Deluxe Room"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.roomType}
                        />
                      </div>
                    </div>
                  </section>
                )}

                {/* Car Rental fields */}
                {emailType === "car_rental" && (
                  <section className={sectionClass}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-5">Car Rental Details</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Car Type</label>
                        <input
                          name="carType"
                          placeholder="e.g., SUV, Sedan, Hatchback"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.carType}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Rental Days</label>
                        <input
                          name="rentalDays"
                          type="number"
                          placeholder="e.g., 3"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.rentalDays}
                        />
                      </div>
                    </div>
                  </section>
                )}

                {/* Travel Insurance fields */}
                {emailType === "travel_insurance" && (
                  <section className={sectionClass}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-5">Insurance Details</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Insurance Type</label>
                        <input
                          name="insuranceType"
                          placeholder="e.g., Comprehensive, Medical, Trip Cancellation"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.insuranceType}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Coverage Amount</label>
                        <input
                          name="insuranceCoverage"
                          placeholder="e.g., $50,000"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.insuranceCoverage}
                        />
                      </div>
                    </div>
                  </section>
                )}

                {/* Common Booking Info for non-flight-ticket forms */}
                {emailType !== "customer_support" && emailType !== "holiday_package" && (
                  <section className={sectionClass}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                      Booking Details
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Confirmation Number</label>
                        <input
                          name="confirmationNumber"
                          placeholder="e.g. ABC123"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.confirmationNumber}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Airline (if applicable)</label>
                        <input
                          name="airline"
                          placeholder="e.g. Delta Airlines"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.airline}
                        />
                      </div>
                    </div>
                  </section>
                )}

                {/* Refund Request */}
                {emailType === "refund_request" && (
                  <section className={sectionClass}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-5">Refund Information</h3>
                    <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
                      <div>
                        <label className={labelClass}>Refund Amount (USD) *</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          name="refundAmount"
                          placeholder="0.00"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.refundAmount}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Cancellation Date (optional)</label>
                        <input
                          type="date"
                          name="cancellationDate"
                          className={inputClass}
                          onChange={handleChange}
                          value={generalForm.cancellationDate}
                        />
                      </div>
                    </div>
                  </section>
                )}

                {/* Customer Support */}
                {emailType === "customer_support" && (
                  <section className={sectionClass}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-5">Custom Message</h3>
                    <textarea
                      name="customMessage"
                      rows="6"
                      placeholder="Write your detailed message here..."
                      className={`${inputClass} resize-none`}
                      onChange={handleChange}
                      value={generalForm.customMessage}
                    />
                  </section>
                )}
              </>
            )}

            {/* Messages */}
            {successMessage && (
              <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Auth Email"
                )}
              </button>
            </div>

            {/* NEW: Pay Now Button (only shows after email is sent) */}
            {emailSent && bookingData && (
              <div className="pt-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 mb-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Email Sent Successfully!
                  </h3>
                  <p className="text-green-700 mb-3">
                    Now you can proceed to payment for {bookingData.customerName}'s booking.
                  </p>
                  <div className="flex items-center text-sm text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Amount: <span className="font-bold ml-1">${bookingData.bookingAmount}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePayNow}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Pay Now
                </button>

                <p className="text-sm text-gray-500 text-center mt-2">
                  Click to proceed to secure payment gateway
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Save Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Save as Template</h3>
            <p className="text-gray-600 mb-4">
              Save the current details as a template for future use. Customer-specific information will not be saved.
            </p>
            <input
              type="text"
              placeholder="Enter template name (e.g., Kashmir 5 Nights Package)"
              className={`${inputClass} mb-4`}
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowTemplateModal(false)}
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveAsTemplate}
                disabled={isSavingTemplate || !newTemplateName.trim()}
                className="cursor-pointer px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium disabled:opacity-70 transition-all"
              >
                {isSavingTemplate ? "Saving..." : "Save Template"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendEmail;