"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/budgetRoutes.ts
const express_1 = require("express");
const Budget_1 = require("../models/Budget");
const router = (0, express_1.Router)();
const budget = new Budget_1.Budget();
// Set a budget
router.post("/", (req, res) => {
    const { category, limit } = req.body;
    budget.setBudget(category, limit);
    res.send({ message: `Budget for ${category} set to $${limit}` });
});
// Get all budgets
router.get("/", (req, res) => {
    res.send(budget.getBudgets());
});
exports.default = router;
