import { NotFoundError } from "../errors/not-found-error";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { z } from "zod";
import { IExpensesRepository } from "../repositories/expenses-repository-interface";
import { createExpenseSchema, updateExpenseSchema } from "../schemas/expenses-schema";
import { Expense } from "../models/expense";

type createExpenseData = z.infer<typeof createExpenseSchema>;
type updateExpenseData = z.infer<typeof updateExpenseSchema>;

export class ExpensesService {
  private repository: IExpensesRepository;

  constructor(repository: IExpensesRepository) {
    this.repository = repository;
  }

  async create(data: createExpenseData, userId: string): Promise<Expense> {
    const { amount, category, date, type } = data;

    const created = await this.repository.create({
      amount,
      category,
      date,
      type,
      user: userId,
    });

    return created;
  }

  async getAllByUser(userId: string): Promise<Expense[]> {
    const expenses = await this.repository.findAllByUser(userId);
    return expenses;
  }

  async getById(id: string, userId: string): Promise<Expense | null> {
    const expense = await this.repository.findById(id);
    if (!expense) throw new NotFoundError("Expense not found.");

    if (expense.user !== userId) {
      throw new UnauthorizedError("You do not have access to this expense.");
    }

    return expense;
  }

  async update(id: string, data: updateExpenseData, userId: string): Promise<Expense> {
    const expense = await this.repository.findById(id);
    if (!expense) throw new NotFoundError("Expense not found.");

    if (expense.user !== userId) {
      throw new UnauthorizedError("You do not have access to this expense.");
    }

    const updated = await this.repository.update(id, data);
    return updated;
  }

  async delete(id: string, userId: string): Promise<Expense> {
    const expense = await this.repository.findById(id);
    if (!expense) throw new NotFoundError("Expense not found.");

    if (expense.user !== userId) {
      throw new UnauthorizedError("You do not have access to this expense.");
    }

    const deleted = await this.repository.delete(id);
    return deleted;
  }
}
