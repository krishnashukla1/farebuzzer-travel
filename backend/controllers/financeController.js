
// import mongoose from 'mongoose'; 
// import Income from "../models/Income.js";
// import Expense from "../models/Expense.js";
// import Project from "../models/Project.js";
// import ExcelJS from "exceljs";
// import axios from "axios";

// /* ============================================================
//    📌 ADD INCOME
// ============================================================ */
// export const addIncome = async (req, res) => {
//   try {
//     const data = { ...req.body, user: req.user.id };

//     const income = await Income.create(data);

//     res.status(201).json({
//       success: true,
//       message: "Income added successfully",
//       income,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// /* ============================================================
//    📌 ADD EXPENSE
// ============================================================ */
// export const addExpense = async (req, res) => {
//   try {
//     const data = { ...req.body, user: req.user.id };

//     const expense = await Expense.create(data);

//     res.status(201).json({
//       success: true,
//       message: "Expense added successfully",
//       expense,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// /* ============================================================
//    📌 GET ALL INCOMES
// ============================================================ */

// export const getIncomes = async (req, res) => {
//   try {
//     const { project } = req.query;  // ← CHANGE FROM req.params.projectId

//     const incomes = await Income.find({
//       user: req.user.id,
//       project: project  // ← this is string, and your data is string → perfect match
//     }).sort({ date: -1 });

//     res.json({ success: true, incomes });
//   } catch (err) {
//     console.error("getIncomes error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// /* ============================================================
//    📌 GET ALL EXPENSES
// ============================================================ */

// export const getExpenses = async (req, res) => {
//   try {
//     const { project } = req.query;  // ← CHANGE FROM req.params.projectId

//     const expenses = await Expense.find({
//       user: req.user.id,
//       project: project
//     }).sort({ date: -1 });

//     res.json({ success: true, expenses });
//   } catch (err) {
//     console.error("getExpenses error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };


// /* ============================================================
//    📌 UPDATE INCOME
// ============================================================ */
// export const updateIncome = async (req, res) => {
//   try {
//     const income = await Income.findOneAndUpdate(
//       { _id: req.params.id, user: req.user.id },
//       req.body,
//       { new: true }
//     );

//     if (!income)
//       return res.status(404).json({ success: false, message: "Income not found" });

//     res.json({ success: true, message: "Income updated", income });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// /* ============================================================
//    📌 UPDATE EXPENSE
// ============================================================ */
// export const updateExpense = async (req, res) => {
//   try {
//     const expense = await Expense.findOneAndUpdate(
//       { _id: req.params.id, user: req.user.id },
//       req.body,
//       { new: true }
//     );

//     if (!expense)
//       return res.status(404).json({ success: false, message: "Expense not found" });

//     res.json({ success: true, message: "Expense updated", expense });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// /* ============================================================
//    📌 DELETE INCOME
// ============================================================ */
// export const deleteIncome = async (req, res) => {
//   try {
//     const income = await Income.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user.id,
//     });

//     if (!income)
//       return res.status(404).json({ success: false, message: "Income not found" });

//     res.json({ success: true, message: "Income deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// /* ============================================================
//    📌 DELETE EXPENSE
// ============================================================ */
// export const deleteExpense = async (req, res) => {
//   try {
//     const expense = await Expense.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user.id,
//     });

//     if (!expense)
//       return res.status(404).json({ success: false, message: "Expense not found" });

//     res.json({ success: true, message: "Expense deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// /* ============================================================
//    📌 FINANCIAL SUMMARY
// ============================================================ */

// export const getProjectSummary = async (req, res) => {
//   try {
//     const { project } = req.query;

//     if (!project || project === "null" || project === "undefined") {
//       return res.status(400).json({ success: false, error: "Project ID required" });
//     }

//     // Hardcoded rates (1 USD = 88.5 INR, etc.) — accurate as of Nov 2025
//     const RATES_TO_INR = {
//       USD: 88.5,
//       AED: 24.1,
//       CAD: 63.8,
//       AUD: 58.4,
//       INR: 1,
//     };

//     const [incomes, expenses] = await Promise.all([
//       Income.find({ project: project }).select("amount currency"),
//       Expense.find({ project: project }).select("amount currency"),
//     ]);

//     const totalIncomeINR = incomes.reduce((sum, inc) => {
//       const rate = RATES_TO_INR[inc.currency] || 1;
//       return sum + inc.amount * rate;
//     }, 0);

//     // 🔥 Add total commission
// const totalIncomeCommissionINR = incomes.reduce((sum, inc) => {
//   const rate = RATES_TO_INR[inc.currency] || 1;
//   return sum + (inc.commission || 0) * rate;
// }, 0);

//     const totalExpenseINR = expenses.reduce((sum, exp) => {
//       const rate = RATES_TO_INR[exp.currency] || 1;
//       return sum + exp.amount * rate;
//     }, 0);

//     const balanceINR = totalIncomeINR - totalExpenseINR;

//     res.json({
//       success: true,
//       summary: {
//         totalIncomeINR: Number(totalIncomeINR.toFixed(2)),
//         totalExpenseINR: Number(totalExpenseINR.toFixed(2)),
//         balanceINR: Number(balanceINR.toFixed(2)),
//       },
//     });
//   } catch (err) {
//     console.error("getProjectSummary Error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };


// export const downloadFinanceExcel = async (req, res) => {
//   try {
//     const { project, month, year } = req.query;

//     if (!project || project === "null" || project === "undefined") {
//       return res.status(400).json({ success: false, error: "Project ID required" });
//     }

//     // Build date filter
//     const dateFilter = {};
//     if (month || year) {
//       dateFilter.$expr = {
//         $and: []
//       };

//       if (month) {
//         dateFilter.$expr.$and.push({
//           $eq: [{ $month: "$date" }, Number(month)]
//         });
//       }
//       if (year) {
//         dateFilter.$expr.$and.push({
//           $eq: [{ $year: "$date" }, Number(year)]
//         });
//       }
//       // If no conditions added (shouldn't happen), remove $and
//       if (dateFilter.$expr.$and.length === 0) delete dateFilter.$expr;
//     }

//     // Fetch filtered data
//     const [incomes, expenses, projectDoc] = await Promise.all([
//       Income.find({
//         user: req.user.id,
//         project,
//         ...(Object.keys(dateFilter).length > 0 ? dateFilter : {})
//       }).sort({ date: -1 }),

//       Expense.find({
//         user: req.user.id,
//         project,
//         ...(Object.keys(dateFilter).length > 0 ? dateFilter : {})
//       }).sort({ date: -1 }),

//       Project.findById(project),
//     ]);

//     const projectName = projectDoc?.name || "Unknown Project";

//     // Add filter info to title
//     const monthNames = ["", "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"];

//     let periodText = "All Time";
//     if (month && year) {
//       periodText = `${monthNames[Number(month)]} ${year}`;
//     } else if (year) {
//       periodText = `Year ${year}`;
//     }

//     // Rest of your Excel code remains SAME until title...
//     const workbook = new ExcelJS.Workbook();
//     const sheet = workbook.addWorksheet("Finance Report");

//     sheet.columns = [
//       { header: "Type", key: "type", width: 12 },
//       { header: "Title", key: "title", width: 28 },
//       { header: "Amount", key: "amount", width: 15 },
//       { header: "Currency", key: "currency", width: 10 },
//       { header: "Amount (INR)", key: "amountINR", width: 15 },
//         { header: "Commission (INR)", key: "commissionINR", width: 15 }, // new
//       { header: "Category", key: "category", width: 22 },
//       { header: "Payment Method", key: "paymentMethod", width: 18 },
//       { header: "Date", key: "date", width: 15 },
//       { header: "Description", key: "description", width: 25 },
//     ];

//     // Header styling (same)
//     sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
//     sheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E40AF" } };
//     sheet.getRow(1).alignment = { horizontal: "center", vertical: "middle" };

//     const liveRates = { USD: 88.5, AED: 24.1, INR: 1, CAD: 63.8, AUD: 58.4 };
//     const currencySymbols = { USD: "$", AED: "د.إ", INR: "₹", CAD: "C$", AUD: "A$" };

//     const convertToINR = (amount, fromCurrency) => {
//       if (!amount || isNaN(amount)) return 0;
//       const rate = liveRates[fromCurrency] || 1;
//       return Number(amount) * rate;
//     };
// // 🔥 FIX: Missing function (needed for Multi-Currency Summary)
// const convertFromINR = (amountINR, toCurrency) => {
//   if (!amountINR || isNaN(amountINR)) return 0;
//   const rate = liveRates[toCurrency] || 1;
//   return Number(amountINR) / rate;
// };

//     // Title with filter info
//     sheet.addRow({});
//     const titleRow = sheet.addRow({
//       title: `FINANCE REPORT - ${projectName.toUpperCase()} (${periodText})`
//     });
//     titleRow.font = { bold: true, size: 16, color: { argb: "FF1E40AF" } };
//     titleRow.alignment = { horizontal: "center" };
//     sheet.mergeCells(`A${titleRow.number}:I${titleRow.number}`);
//     sheet.addRow({});

//   // Add incomes
//     if (incomes.length > 0) {
//       const incomeHeader = sheet.addRow({ 
//         type: "INCOME TRANSACTIONS", 
//         title: `Total: ${incomes.length} records` 
//       });
//       incomeHeader.font = { bold: true, color: { argb: "FF166534" } };
//       incomeHeader.fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "FFDCFCE7" },
//       };
//       sheet.mergeCells(`A${incomeHeader.number}:I${incomeHeader.number}`);
//     }

//     incomes.forEach((i) => {
//       const amountINR = convertToINR(i.amount, i.currency);
//         const commissionINR = convertToINR(i.commission || 0, i.currency);
//       sheet.addRow({
//         type: "Income",
//         title: i.title,
//         amount: i.amount,
//         currency: i.currency,
//         amountINR: Number(amountINR.toFixed(2)),
//          commissionINR: Number(commissionINR.toFixed(2)), // new
//         category: i.category,
//         paymentMethod: i.paymentMethod || "Cash",
//         date: new Date(i.date).toLocaleDateString("en-IN"),
//         description: i.description || "-",
//       });
//     });

//     // Add expenses
//     if (expenses.length > 0) {
//       sheet.addRow({}); // Spacing
//       const expenseHeader = sheet.addRow({ 
//         type: "EXPENSE TRANSACTIONS", 
//         title: `Total: ${expenses.length} records` 
//       });
//       expenseHeader.font = { bold: true, color: { argb: "FFDC2626" } };
//       expenseHeader.fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "FFFEE2E2" },
//       };
//       sheet.mergeCells(`A${expenseHeader.number}:I${expenseHeader.number}`);
//     }

//     expenses.forEach((e) => {
//       const amountINR = convertToINR(e.amount, e.currency);
//       sheet.addRow({
//         type: "Expense",
//         title: e.title,
//         amount: e.amount,
//         currency: e.currency,
//         amountINR: Number(amountINR.toFixed(2)),
//         category: e.category,
//         paymentMethod: e.paymentMethod || "Cash",
//         date: new Date(e.date).toLocaleDateString("en-IN"),
//         description: e.description || "-",
//       });
//     });

//     // Calculate totals in INR
//     const totalIncomeINR = incomes.reduce((sum, i) => {
//       return sum + convertToINR(i.amount, i.currency);
//     }, 0);

//     const totalExpenseINR = expenses.reduce((sum, e) => {
//       return sum + convertToINR(e.amount, e.currency);
//     }, 0);

//     // Calculate commission totals
// const totalIncomeCommissionINR = incomes.reduce((sum, i) => {
//   return sum + convertToINR(i.commission || 0, i.currency);
// }, 0);

// const totalExpenseCommissionINR = expenses.reduce((sum, e) => {
//   return sum + convertToINR(e.commission || 0, e.currency);
// }, 0);


//     const balanceINR = totalIncomeINR - totalExpenseINR;

//     // Add comprehensive summary section
//     sheet.addRow({}); // Spacing
//     const summaryHeader = sheet.addRow({ title: "FINANCIAL SUMMARY" });
//     summaryHeader.font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
//     summaryHeader.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "FF1E40AF" },
//     };
//     sheet.mergeCells(`A${summaryHeader.number}:I${summaryHeader.number}`);
//     summaryHeader.alignment = { horizontal: "center" };

//     // Exchange Rates Section
//     sheet.addRow({ title: "Exchange Rates (Base: INR)" });
//     sheet.getRow(sheet.lastRow.number).font = { bold: true, color: { argb: "FF1E40AF" } };
    
//     Object.entries(liveRates).forEach(([currency, rate]) => {
//       if (currency !== "INR") {
//         sheet.addRow({ 
//           title: `1 ${currency} = ${rate} INR`,
//           amount: `1 INR = ${(1/rate).toFixed(4)} ${currency}`
//         });
//       }
//     });
//     sheet.addRow({});

//     // Main Summary in INR
//     sheet.addRow({ title: "SUMMARY IN INR (₹)" });
//     sheet.getRow(sheet.lastRow.number).font = { bold: true, color: { argb: "FF166534" } };
    
//     sheet.addRow({ 
//       title: "Total Income", 
//       amountINR: Number(totalIncomeINR.toFixed(2))
//     });
//     sheet.getRow(sheet.lastRow.number).getCell(2).font = { bold: true, color: { argb: "FF166534" } };
    

//     // 🔥 ADD INCOME COMMISSION HERE
// sheet.addRow({
//   title: "Total Income Commission",
//   amountINR: Number(totalIncomeCommissionINR.toFixed(2))
// });

//     sheet.addRow({ 
//       title: "Total Expense", 
//       amountINR: Number(totalExpenseINR.toFixed(2))
//     });
//     sheet.getRow(sheet.lastRow.number).getCell(2).font = { bold: true, color: { argb: "FFDC2626" } };
    
//     sheet.addRow({ 
//       title: "Balance", 
//       amountINR: Number(balanceINR.toFixed(2))
//     });
//     const balanceRow = sheet.getRow(sheet.lastRow.number);
//     balanceRow.getCell(2).font = { 
//       bold: true, 
//       color: { argb: balanceINR >= 0 ? "FF166534" : "FFDC2626" }
//     };
    
//     sheet.addRow({});

//     // Multi-Currency Summary
//     sheet.addRow({ title: "MULTI-CURRENCY SUMMARY" });
//     sheet.getRow(sheet.lastRow.number).font = { bold: true, color: { argb: "FF1E40AF" } };
    
//     const currencies = ["USD", "AED", "INR", "CAD", "AUD"];
//     currencies.forEach(currency => {
//       const incomeInCurrency = convertFromINR(totalIncomeINR, currency);
//       const expenseInCurrency = convertFromINR(totalExpenseINR, currency);
//       const balanceInCurrency = convertFromINR(balanceINR, currency);
      
//       sheet.addRow({
//         title: `${currency} ${currencySymbols[currency]}`,
//         amount: `Income: ${currencySymbols[currency]}${incomeInCurrency.toFixed(2)}`,
//         currency: `Expense: ${currencySymbols[currency]}${expenseInCurrency.toFixed(2)}`,
//         amountINR: `Balance: ${currencySymbols[currency]}${balanceInCurrency.toFixed(2)}`
//       });
      
//       const currRow = sheet.getRow(sheet.lastRow.number);
//       currRow.getCell(2).font = { color: { argb: "FF166534" } }; // Income - Green
//       currRow.getCell(3).font = { color: { argb: "FFDC2626" } }; // Expense - Red
//       currRow.getCell(4).font = { 
//         color: { argb: balanceInCurrency >= 0 ? "FF166534" : "FFDC2626" },
//         bold: true
//       }; // Balance
//     });

//     // Style all numeric cells
//     sheet.eachRow((row, rowNumber) => {
//       if (rowNumber > 1) {
//         // Style amount columns
//         if (row.getCell(3).value && typeof row.getCell(3).value === 'number') {
//           row.getCell(3).numFmt = '#,##0.00';
//         }
//         if (row.getCell(5).value && typeof row.getCell(5).value === 'number') {
//           row.getCell(5).numFmt = '#,##0.00';
//         }
        
//         // Center align type and currency columns
//         row.getCell(1).alignment = { horizontal: 'center' };
//         row.getCell(4).alignment = { horizontal: 'center' };
//         row.getCell(7).alignment = { horizontal: 'center' };
//       }
//     });

//     // Auto-filter for data rows only (exclude headers and summary)
//     const dataEndRow = incomes.length + expenses.length + 5; // +5 for headers and spacing
//     if (dataEndRow > 6) {
//       sheet.autoFilter = {
//         from: { row: 4, column: 1 },
//         to: { row: dataEndRow, column: 9 },
//       };
//     }

//     // Add generated timestamp
//     sheet.addRow({});
//     const timestampRow = sheet.addRow({ 
//       title: `Report generated on: ${new Date().toLocaleString('en-IN', { 
//         timeZone: 'Asia/Kolkata',
//         dateStyle: 'full',
//         timeStyle: 'medium'
//       })}` 
//     });
//     timestampRow.font = { italic: true, color: { argb: "FF6B7280" } };
//     sheet.mergeCells(`A${timestampRow.number}:I${timestampRow.number}`);



//     // At the very end — smart filename
//     const safeName = projectName.replace(/[^a-zA-Z0-9]/g, "_");
//     const filterSuffix = month || year ? `${month ? monthNames[Number(month)] + "_" : ""}${year || ""}` : "All_Time";
//     const dateStamp = new Date().toISOString().slice(0, 10);

//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=${safeName}_Finance_Report_${filterSuffix}_${dateStamp}.xlsx`
//     );
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );

//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (error) {
//     console.error("Excel download error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


// /* ============================================================
//    📌 LIVE EXCHANGE RATE API
// ============================================================ */
// export const getLiveExchangeRates = async (req, res) => {
//   try {
//     const url =
//       "https://api.exchangerate-api.com/v4/latest/INR";

//     const { data } = await axios.get(url);

//     res.status(200).json({
//       success: true,
//       base: "INR",
//       rates: data.rates,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


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
