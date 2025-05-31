import { ConflictError } from "../errors/conflict-error";
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
}
