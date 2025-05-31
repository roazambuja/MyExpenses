export type ExpenseType = "expense" | "income";

export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: Date;
  type: ExpenseType;
  user: string;
};
