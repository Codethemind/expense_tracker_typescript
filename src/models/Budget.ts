export class Budget {
  private categoryBudgets: Map<string, number> = new Map();

  setBudget(category: string, limit: number): void {
    this.categoryBudgets.set(category, limit);
    console.log(`Budget set for ${category}: $${limit}`);
  }

  checkLimit(category: string, totalSpent: number): void {
    const limit = this.categoryBudgets.get(category);
    if (limit && totalSpent > limit) {
      console.log(`Warning: You have exceeded the budget for ${category}!`);
    }
  }
}
