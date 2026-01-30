// Create new file: pages/AgreementPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const AgreementPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Auto-submit when page loads
    handleAutoAgree();
  }, []);

  const handleAutoAgree = async () => {
    try {
      setLoading(true);
      
      // Decode token to get email and booking reference
      const decoded = Buffer.from(token, 'base64').toString();
      const [email, bookingRef] = decoded.split(':');
      
      // Submit agreement
      const response = await API.post('/agreement/submit-agreement', {
        customerEmail: email,
        customerName: email.split('@')[0],
        bookingReference: bookingRef
      });

      if (response.data.success) {
        setMessage('✅ Agreement submitted! You will receive confirmation shortly.');
        
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setMessage('❌ Failed to submit agreement. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-800">Processing Agreement...</h2>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Agreement Confirmed!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">
                Your IP address has been recorded for security verification.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AgreementPage;