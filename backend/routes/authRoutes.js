// import express from "express";
// import { login, register } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/login", login);
// router.post("/register", register); // optional

// export default router;


import express from "express";
import { login, register } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

// ✅ PROTECTED ROUTE (VERY IMPORTANT)
router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

export default router;
