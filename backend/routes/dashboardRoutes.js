// import express from "express";
// import { dashboardStats } from "../controllers/dashboardController.js";
// const router = express.Router();

// router.get("/", dashboardStats);

// export default router;


import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { verifyToken } from "../controllers/userController.js";

const router = express.Router();

router.get("/", verifyToken, getDashboardStats);


export default router;
