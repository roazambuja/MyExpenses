import { Expense } from "../models/expense";

export interface IExpensesRepository {
  findAll: () => Promise<Expense[]>;
  findById: (id: string) => Promise<Expense | null>;
  create: (expenseData: Omit<Expense, "id">) => Promise<Expense>;
  update: (id: string, updatedData: Partial<Expense>) => Promise<Expense>;
  delete: (id: string) => Promise<Expense>;
}
