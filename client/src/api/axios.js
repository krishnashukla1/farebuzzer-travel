// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
  
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// // 🔐 Automatically attach token
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;


//===================================correct===================================================

// C:\Users\hp\Desktop\OFFICE8-FBT-NEW-PROJECT\client\src\api\axios.js

// import axios from "axios";

// // Use dynamic base URL from .env
// const API = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// // 🔐 Automatically attach token
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


// export default API;





// //
// export default API;


//======================3 jan=========
import axios from "axios";

// Use dynamic base URL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// 🔐 Automatically attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


// Login hours API methods - add these to your API object
API.loginHours = {
  login: () => API.post('/login-hours/login'),
  logout: () => API.post('/login-hours/logout'),
  startBreak: () => API.post('/login-hours/break/start'),
  endBreak: () => API.post('/login-hours/break/end'),
  requestBreak: () => API.post('/login-hours/break/request'),
  getTodayStats: () => API.get('/login-hours/today'),
  getMyLoginHours: (params) => API.get('/login-hours/my-hours', { params }),
  reviewBreak: (data) => API.post('/login-hours/break/review', data),
  getPendingBreaks: () => API.get('/login-hours/break/pending'),
  getAllLoginHours: (params) => API.get('/login-hours', { params }),
};

// export default API;


// Login hours API methods - add these to your API object
// API.loginHours = {
//   login: () => API.post('/login-hours/login'),
//   logout: () => API.post('/login-hours/logout'),
//   startBreak: () => API.post('/login-hours/break/start'),
//   endBreak: () => API.post('/login-hours/break/end'),
//   requestBreak: () => API.post('/login-hours/break/request'),
//   getTodayStats: () => API.get('/login-hours/today'),
//   getMyLoginHours: (params) => API.get('/login-hours/my-hours', { params }),
//   reviewBreak: (data) => API.post('/login-hours/break/review', data),
//   getPendingBreaks: () => API.get('/login-hours/break/pending'),
//   getAllLoginHours: (params) => API.get('/login-hours', { params }),
// };

export default API;


