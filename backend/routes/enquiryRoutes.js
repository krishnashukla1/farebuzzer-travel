// import express from "express";
// import {
//   createEnquiry,
//   getEnquiries,
//   updateEnquiryStatus,
//   deleteEnquiry
// } from "../controllers/enquiryController.js";

// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Public (Website)
// router.post("/", createEnquiry);

// // CRM (Protected)
// router.get("/", authMiddleware, getEnquiries);
// router.put("/:id/status", authMiddleware, updateEnquiryStatus);
// router.delete("/:id", authMiddleware, deleteEnquiry);

// export default router;


//==============protected==========
import express from "express";
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} from "../controllers/enquiryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// ➕ Create enquiry (admin + user)
router.post("/", authMiddleware, createEnquiry);

// 👀 View enquiries
router.get("/", authMiddleware, getEnquiries);

// 🔄 Update enquiry (ADMIN ONLY)
router.put("/:id/status", authMiddleware, adminOnly, updateEnquiryStatus);

// ❌ Delete enquiry (ADMIN ONLY)
router.delete("/:id", authMiddleware, adminOnly, deleteEnquiry);

export default router;
