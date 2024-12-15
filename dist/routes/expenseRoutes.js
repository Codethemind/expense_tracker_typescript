"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Expense_1 = require("../models/Expense");
const router = (0, express_1.Router)();
const expenses = []; // Temporary storage for expenses
// Add an expense
router.post("/", ((req, res) => {
    const { category, amount, date } = req.body;
    const expenseDate = new Date(date);
    let expense;
    switch (category) {
        case "Food":
            expense = new Expense_1.FoodExpense(amount, expenseDate, category);
            break;
        case "Travel":
            expense = new Expense_1.TravelExpense(amount, expenseDate, category);
            break;
        case "Shopping":
            expense = new Expense_1.ShoppingExpense(amount, expenseDate, category);
            break;
        default:
            res.status(400).send({ error: "Invalid category" });
            return;
    }
    expenses.push(expense);
    res.status(201).send(expense);
}));
// Get all expenses
router.get("/", ((req, res) => {
    res.send(expenses);
}));
exports.default = router;
