import { Expense } from "../models/expense";

export interface IExpensesRepository {
  findById: (id: string) => Promise<Expense | null>;
  findAllByUser: (userId: string) => Promise<Expense[]>;
  create: (expenseData: Omit<Expense, "id">) => Promise<Expense>;
  update: (id: string, updatedData: Partial<Expense>) => Promise<Expense>;
  delete: (id: string) => Promise<Expense>;
}
