"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
class Report {
    generateSummary(expenses) {
        const categoryTotals = new Map();
        expenses.forEach((expense) => {
            const total = expense.calculateTotal();
            const current = categoryTotals.get(expense.category) || 0;
            categoryTotals.set(expense.category, current + total);
        });
        console.log("Expense Summary:");
        categoryTotals.forEach((total, category) => {
            console.log(`${category}: $${total}`);
        });
    }
}
exports.Report = Report;
