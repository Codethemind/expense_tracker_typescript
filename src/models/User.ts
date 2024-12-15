import { Expense } from "./Expense";

export abstract class User {
  constructor(public name: string) {}
}

export class Admin extends User {
  private categories: Set<string> = new Set();

  addCategory(category: string): void {
    this.categories.add(category);
    console.log(`Category '${category}' added.`);
  }

  listCategories(): void {
    console.log("Available categories:", Array.from(this.categories));
  }
}

export class RegularUser extends User {
  private expenses: Expense[] = [];

  addExpense(expense: Expense): void {
    this.expenses.push(expense);
    console.log(`Expense of $${expense.amount} added to category '${expense.category}'.`);
  }

  listExpenses(): void {
    this.expenses.forEach((exp) =>
      console.log(`${exp.category} - $${exp.amount} on ${exp.date.toDateString()}`)
    );
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }
}

