import { NotFoundError } from "../errors/not-found-error";
import { Expense } from "../models/expense";
import { IExpensesRepository } from "./expenses-repository-interface";

export class ExpensesRepository implements IExpensesRepository {
  private static expenses: Expense[] = [];

  async create(expenseData: Omit<Expense, "id">): Promise<Expense> {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      ...expenseData,
    };
    ExpensesRepository.expenses.push(newExpense);
    return newExpense;
  }

  async findAll(): Promise<Expense[]> {
    return ExpensesRepository.expenses;
  }

  async findById(id: string): Promise<Expense | null> {
    return ExpensesRepository.expenses.find((expense) => expense.id === id) ?? null;
  }

  async update(id: string, updatedData: Partial<Expense>): Promise<Expense> {
    const expense = await this.findById(id);
    if (!expense) throw new NotFoundError("Expense not found.");
    Object.assign(expense, updatedData);
    return expense;
  }

  async delete(id: string): Promise<Expense> {
    const index = ExpensesRepository.expenses.findIndex((expense) => expense.id === id);
    if (index === -1) throw new NotFoundError("Expense not found.");

    const [deletedExpense] = ExpensesRepository.expenses.splice(index, 1);
    return deletedExpense;
  }
}
