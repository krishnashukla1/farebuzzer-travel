// Create new file: src/pages/ThankYouPage.jsx
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You! 🎉</h2>
        <p className="text-gray-600 mb-6">
          Your agreement has been successfully processed. Our team will contact you shortly.
        </p>
        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Return to Home
          </Link>
          <Link
            to="/send-email"
            className="block w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 rounded-xl transition-all"
          >
            Send Another Email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;