"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const User_1 = require("./models/User");
const Budget_1 = require("./models/Budget");
const Report_1 = require("./models/Report");
const Expense_1 = require("./models/Expense");
// Initialize classes
const admin = new User_1.Admin("Admin");
const user = new User_1.RegularUser("John Doe");
const budget = new Budget_1.Budget();
const report = new Report_1.Report();
// Expense categories
admin.addCategory("Food");
admin.addCategory("Travel");
admin.addCategory("Shopping");
// Main menu
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const { action } = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "action",
                message: "What would you like to do?",
                choices: [
                    "Add Expense",
                    "Set Budget",
                    "View Expenses",
                    "Generate Report",
                    "Exit",
                ],
            },
        ]);
        switch (action) {
            case "Add Expense":
                yield addExpense();
                break;
            case "Set Budget":
                yield setBudget();
                break;
            case "View Expenses":
                user.listExpenses();
                break;
            case "Generate Report":
                report.generateSummary(user.getExpenses());
                break;
            case "Exit":
                console.log("Goodbye!");
                return;
        }
        yield mainMenu();
    });
}
// Add an expense
function addExpense() {
    return __awaiter(this, void 0, void 0, function* () {
        const { category, amount, date } = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "category",
                message: "Select a category for the expense:",
                choices: ["Food", "Travel", "Shopping"],
            },
            {
                type: "input",
                name: "amount",
                message: "Enter the expense amount:",
                validate: (value) => (!isNaN(parseFloat(value)) && parseFloat(value) > 0) || "Please enter a valid amount.",
            },
            {
                type: "input",
                name: "date",
                message: "Enter the expense date (YYYY-MM-DD):",
                validate: (value) => !isNaN(new Date(value).getTime()) || "Please enter a valid date.",
            },
        ]);
        const expenseDate = new Date(date);
        const expenseAmount = parseFloat(amount);
        let expense;
        switch (category) {
            case "Food":
                expense = new Expense_1.FoodExpense(expenseAmount, expenseDate, category);
                break;
            case "Travel":
                expense = new Expense_1.TravelExpense(expenseAmount, expenseDate, category);
                break;
            case "Shopping":
                expense = new Expense_1.ShoppingExpense(expenseAmount, expenseDate, category);
                break;
        }
        if (expense) {
            user.addExpense(expense);
            console.log(`Added ${category} expense of $${amount} on ${expenseDate.toDateString()}.`);
        }
    });
}
// Set a budget
function setBudget() {
    return __awaiter(this, void 0, void 0, function* () {
        const { category, limit } = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "category",
                message: "Select a category to set a budget:",
                choices: ["Food", "Travel", "Shopping"],
            },
            {
                type: "input",
                name: "limit",
                message: "Enter the budget limit:",
                validate: (value) => (!isNaN(parseFloat(value)) && parseFloat(value) > 0) || "Please enter a valid number.",
            },
        ]);
        budget.setBudget(category, parseFloat(limit));
        console.log(`Budget for ${category} set to $${limit}.`);
    });
}
// Start the application
mainMenu();
