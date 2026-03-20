

//===============================================================
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import Project from "../models/Project.js";
import ExcelJS from "exceljs";
import axios from "axios";

/* ============================================================
   📌 ADD INCOME
============================================================ */
export const addIncome = async (req, res) => {
  try {
    const income = await Income.create(req.body);

    res.status(201).json({
      success: true,
      message: "Income added successfully",
      income,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ============================================================
   📌 ADD EXPENSE
============================================================ */
export const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ============================================================
   📌 GET ALL INCOMES
============================================================ */
export const getIncomes = async (req, res) => {
  try {
    const { project } = req.query;

    const incomes = await Income.find({ project }).sort({ date: -1 });

    res.json({ success: true, incomes });
  } catch (err) {
    console.error("getIncomes error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ============================================================
   📌 GET ALL EXPENSES
============================================================ */
export const getExpenses = async (req, res) => {
  try {
    const { project } = req.query;

    const expenses = await Expense.find({ project }).sort({ date: -1 });

    res.json({ success: true, expenses });
  } catch (err) {
    console.error("getExpenses error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ============================================================
   📌 UPDATE INCOME
============================================================ */
export const updateIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!income) {
      return res.status(404).json({ success: false, message: "Income not found" });
    }

    res.json({ success: true, message: "Income updated", income });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ============================================================
   📌 UPDATE EXPENSE
============================================================ */
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.json({ success: true, message: "Expense updated", expense });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ============================================================
   📌 DELETE INCOME
============================================================ */
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);

    if (!income) {
      return res.status(404).json({ success: false, message: "Income not found" });
    }

    res.json({ success: true, message: "Income deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ============================================================
   📌 DELETE EXPENSE
============================================================ */
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.json({ success: true, message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ============================================================
   📌 FINANCIAL SUMMARY
============================================================ */
export const getProjectSummary = async (req, res) => {
  try {
    const { project } = req.query;

    if (!project) {
      return res.status(400).json({ success: false, error: "Project ID required" });
    }

    const RATES_TO_INR = { USD: 88.5, AED: 24.1, CAD: 63.8, AUD: 58.4, INR: 1 };

    const [incomes, expenses] = await Promise.all([
      Income.find({ project }),
      Expense.find({ project }),
    ]);

    const totalIncomeINR = incomes.reduce(
      (sum, i) => sum + i.amount * (RATES_TO_INR[i.currency] || 1),
      0
    );

    const totalExpenseINR = expenses.reduce(
      (sum, e) => sum + e.amount * (RATES_TO_INR[e.currency] || 1),
      0
    );

    res.json({
      success: true,
      summary: {
        totalIncomeINR: +totalIncomeINR.toFixed(2),
        totalExpenseINR: +totalExpenseINR.toFixed(2),
        balanceINR: +(totalIncomeINR - totalExpenseINR).toFixed(2),
      },
    });
  } catch (err) {
    console.error("getProjectSummary Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ============================================================
   📌 DOWNLOAD FINANCE EXCEL
============================================================ */
export const downloadFinanceExcel = async (req, res) => {
  try {
    const { project } = req.query;

    const [incomes, expenses, projectDoc] = await Promise.all([
      Income.find({ project }).sort({ date: -1 }),
      Expense.find({ project }).sort({ date: -1 }),
      Project.findById(project),
    ]);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Finance");

    sheet.columns = [
      { header: "Type", key: "type" },
      { header: "Title", key: "title" },
      { header: "Amount", key: "amount" },
      { header: "Currency", key: "currency" },
      { header: "Date", key: "date" },
    ];

    incomes.forEach(i =>
      sheet.addRow({
        type: "Income",
        title: i.title,
        amount: i.amount,
        currency: i.currency,
        date: i.date,
      })
    );

    expenses.forEach(e =>
      sheet.addRow({
        type: "Expense",
        title: e.title,
        amount: e.amount,
        currency: e.currency,
        date: e.date,
      })
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${projectDoc?.name || "Project"}_Finance.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Excel error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ============================================================
   📌 LIVE EXCHANGE RATE API
============================================================ */
export const getLiveExchangeRates = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/INR"
    );

    res.json({ success: true, rates: data.rates });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
