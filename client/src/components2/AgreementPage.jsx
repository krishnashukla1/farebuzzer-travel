// // Create new file: pages/AgreementPage.jsx
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../api/axios';

// const AgreementPage = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     // Auto-submit when page loads
//     handleAutoAgree();
//   }, []);

//   const handleAutoAgree = async () => {
//     try {
//       setLoading(true);
      
//       // Decode token to get email and booking reference
//       const decoded = Buffer.from(token, 'base64').toString();
//       const [email, bookingRef] = decoded.split(':');
      
//       // Submit agreement
//       const response = await API.post('/agreement/submit-agreement', {
//         customerEmail: email,
//         customerName: email.split('@')[0],
//         bookingReference: bookingRef
//       });

//       if (response.data.success) {
//         setMessage('✅ Agreement submitted! You will receive confirmation shortly.');
        
//         // Redirect after 3 seconds
//         setTimeout(() => {
//           navigate('/');
//         }, 3000);
//       }
//     } catch (error) {
//       setMessage('❌ Failed to submit agreement. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
//         {loading ? (
//           <>
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <h2 className="text-xl font-bold text-gray-800">Processing Agreement...</h2>
//           </>
//         ) : (
//           <>
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Agreement Confirmed!</h2>
//             <p className="text-gray-600 mb-6">{message}</p>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">
//                 Your IP address has been recorded for security verification.
//               </p>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AgreementPage;



// Create new file: src/pages/AgreementPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AgreementPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    if (token) {
      processAgreement();
    }
  }, [token]);

  const processAgreement = async () => {
    try {
      setLoading(true);
      
      // Decode the token to get customer info
      const decoded = atob(token); // Base64 decode
      console.log('Decoded token:', decoded);
      
      // Token format: email:bookingRef:timestamp
      const [email, bookingRef, timestamp] = decoded.split(':');
      
      // Set customer info for display
      setCustomerInfo({
        email,
        bookingReference: bookingRef,
        timestamp: new Date(parseInt(timestamp)).toLocaleString()
      });

      // Get user's IP address
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ipAddress = ipResponse.data.ip;

      // Send agreement to backend
      const response = await axios.post('http://localhost:5000/api/agreement/submit-agreement', {
        customerEmail: email,
        customerName: email.split('@')[0],
        bookingReference: bookingRef,
        ipAddress: ipAddress,
        method: 'web_click'
      });

      if (response.data.success) {
        setSuccess(true);
        
        // Redirect after 5 seconds
        setTimeout(() => {
          navigate('/thank-you');
        }, 5000);
      } else {
        setError(response.data.message || 'Failed to process agreement');
      }
    } catch (err) {
      console.error('Agreement error:', err);
      setError('An error occurred. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  // If still loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Processing Your Agreement</h2>
          <p className="text-gray-600">Please wait...</p>
        </div>
      </div>
    );
  }

  // If error
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If success
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">✅ Agreement Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your agreement has been successfully submitted and recorded.
          </p>
          
          {customerInfo && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
              <p className="text-sm mb-2">
                <span className="font-medium">Email:</span> {customerInfo.email}
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Booking Reference:</span> {customerInfo.bookingReference}
              </p>
              <p className="text-sm">
                <span className="font-medium">Time:</span> {customerInfo.timestamp}
              </p>
            </div>
          )}
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-700">
              ✅ Your IP address has been recorded for security verification.
            </p>
            <p className="text-sm text-blue-600 mt-2">
              You will receive a confirmation email shortly.
            </p>
          </div>
          
          <p className="text-sm text-gray-500">
            You will be redirected in 5 seconds...
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default AgreementPage;