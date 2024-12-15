"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
class Budget {
    constructor() {
        this.categoryBudgets = new Map();
    }
    setBudget(category, limit) {
        this.categoryBudgets.set(category, limit);
        console.log(`Budget set for ${category}: $${limit}`);
    }
    checkLimit(category, totalSpent) {
        const limit = this.categoryBudgets.get(category);
        if (limit && totalSpent > limit) {
            console.log(`Warning: You have exceeded the budget for ${category}!`);
        }
    }
}
exports.Budget = Budget;
