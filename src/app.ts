import inquirer from "inquirer";
import { Admin, RegularUser } from "./models/User";
import { Budget } from "./models/Budget";
import { Report } from "./models/Report";
import { FoodExpense, TravelExpense, ShoppingExpense } from "./models/Expense";

// Initialize classes
const admin = new Admin("Admin");
const user = new RegularUser("John Doe");
const budget = new Budget();
const report = new Report();

// Expense categories
admin.addCategory("Food");
admin.addCategory("Travel");
admin.addCategory("Shopping");

// Main menu
async function mainMenu() {
  const { action } = await inquirer.prompt([
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
      await addExpense();
      break;
    case "Set Budget":
      await setBudget();
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

  await mainMenu();
}

// Add an expense
async function addExpense() {
  const { category, amount, date } = await inquirer.prompt([
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
        validate: (value: string) =>
          (!isNaN(parseFloat(value)) && parseFloat(value) > 0) || "Please enter a valid amount.",
      }
      ,
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
      expense = new FoodExpense(expenseAmount, expenseDate, category);
      break;
    case "Travel":
      expense = new TravelExpense(expenseAmount, expenseDate, category);
      break;
    case "Shopping":
      expense = new ShoppingExpense(expenseAmount, expenseDate, category);
      break;
  }

  if (expense) {
    user.addExpense(expense);
    console.log(`Added ${category} expense of $${amount} on ${expenseDate.toDateString()}.`);
  }
}

// Set a budget
async function setBudget() {
  const { category, limit } = await inquirer.prompt([
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
        validate: (value: string) =>
          (!isNaN(parseFloat(value)) && parseFloat(value) > 0) || "Please enter a valid number.",
      }
      ,
  ]);

  budget.setBudget(category, parseFloat(limit));
  console.log(`Budget for ${category} set to $${limit}.`);
}

// Start the application
mainMenu();
