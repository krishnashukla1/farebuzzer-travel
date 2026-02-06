// // Create new file: components/SimpleAgreement.jsx
// import { useState } from 'react';
// import API from '../api/axios';

// const SimpleAgreement = ({ customerEmail, customerName, bookingReference }) => {
//   const [loading, setLoading] = useState(false);
//   const [agreed, setAgreed] = useState(false);

//   const handleAgree = async () => {
//     if (!customerEmail || !bookingReference) {
//       alert('Customer email and booking reference are required');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await API.post('/agreement/submit-agreement', {
//         customerEmail,
//         customerName: customerName || customerEmail.split('@')[0],
//         bookingReference
//       });

//       if (response.data.success) {
//         setAgreed(true);
//         alert('Agreement sent successfully! You will receive a confirmation email.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to submit agreement. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
//       <h4 className="font-medium text-blue-800 mb-2">Customer Agreement</h4>
      
//       {agreed ? (
//         <div className="p-3 bg-green-100 text-green-700 rounded">
//           ✅ Agreement submitted! Customer will receive confirmation.
//         </div>
//       ) : (
//         <>
//           <p className="text-sm text-gray-700 mb-3">
//             Please click "I Agree" to confirm and proceed.
//           </p>
          
//           <button
//             onClick={handleAgree}
//             disabled={loading}
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
//           >
//             {loading ? 'Processing...' : '✅ I Agree & Send Email'}
//           </button>
          
//           <p className="text-xs text-gray-500 mt-2">
//             Your IP address will be recorded for security.
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default SimpleAgreement;