
import express from "express";

import {
  addIncome,
  addExpense,
  getIncomes,
  getExpenses,
  updateIncome,
  updateExpense,
  deleteIncome,
  deleteExpense,
  downloadFinanceExcel,
  getLiveExchangeRates,
  getProjectSummary
} from "../controllers/financeController.js";

const router = express.Router();

// 🟦 Debug Logger (optional – safe to keep)
router.use((req, res, next) => {
  console.log(`💰 Finance Route: ${req.method} ${req.path}`);
  console.log("Body:", req.body);
  next();
});

// ===============================
// 📌 Income Routes
// ===============================
router.post("/income", addIncome);
router.get("/incomes", getIncomes);
router.put("/income/:id", updateIncome);
router.delete("/income/:id", deleteIncome);

// ===============================
// 📌 Expense Routes
// ===============================
router.post("/expense", addExpense);
router.get("/expenses", getExpenses);
router.put("/expense/:id", updateExpense);
router.delete("/expense/:id", deleteExpense);

// ===============================
// 📌 Summary + Excel + Currency
// ===============================
router.get("/download", downloadFinanceExcel);
router.get("/rates", getLiveExchangeRates);
router.get("/summary", getProjectSummary);


// ===============================
// 📦 Export Router
// ===============================
export default router;
