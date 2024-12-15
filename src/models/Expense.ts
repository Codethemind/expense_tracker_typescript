 export abstract class Expense {
    constructor(
      public amount: number,
      public date: Date,
      public category: string
    ) {}
  
    abstract calculateTotal(): number;
  }
  
  export class FoodExpense extends Expense {
    calculateTotal(): number {
      return this.amount;
    }
  }
  
  export class TravelExpense extends Expense {
    calculateTotal(): number {
      return this.amount * 1.1;
    }
  }
  
  export class ShoppingExpense extends Expense {
    calculateTotal(): number {
      return this.amount * 0.95;
    }
  }
  