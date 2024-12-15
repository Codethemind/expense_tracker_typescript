"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegularUser = exports.Admin = exports.User = void 0;
class User {
    constructor(name) {
        this.name = name;
    }
}
exports.User = User;
class Admin extends User {
    constructor() {
        super(...arguments);
        this.categories = new Set();
    }
    addCategory(category) {
        this.categories.add(category);
        console.log(`Category '${category}' added.`);
    }
    listCategories() {
        console.log("Available categories:", Array.from(this.categories));
    }
}
exports.Admin = Admin;
class RegularUser extends User {
    constructor() {
        super(...arguments);
        this.expenses = [];
    }
    addExpense(expense) {
        this.expenses.push(expense);
        console.log(`Expense of $${expense.amount} added to category '${expense.category}'.`);
    }
    listExpenses() {
        this.expenses.forEach((exp) => console.log(`${exp.category} - $${exp.amount} on ${exp.date.toDateString()}`));
    }
    getExpenses() {
        return this.expenses;
    }
}
exports.RegularUser = RegularUser;
