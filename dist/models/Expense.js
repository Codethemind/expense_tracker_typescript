"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingExpense = exports.TravelExpense = exports.FoodExpense = exports.Expense = void 0;
class Expense {
    constructor(amount, date, category) {
        this.amount = amount;
        this.date = date;
        this.category = category;
    }
}
exports.Expense = Expense;
class FoodExpense extends Expense {
    calculateTotal() {
        return this.amount;
    }
}
exports.FoodExpense = FoodExpense;
class TravelExpense extends Expense {
    calculateTotal() {
        return this.amount * 1.1;
    }
}
exports.TravelExpense = TravelExpense;
class ShoppingExpense extends Expense {
    calculateTotal() {
        return this.amount * 0.95;
    }
}
exports.ShoppingExpense = ShoppingExpense;
