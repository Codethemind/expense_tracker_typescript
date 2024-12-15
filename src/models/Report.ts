import { Expense } from "./Expense";

export class Report {
  generateSummary(expenses: Expense[]): void {
    const categoryTotals: Map<string, number> = new Map();

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
