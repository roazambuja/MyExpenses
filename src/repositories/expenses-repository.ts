import { PrismaClient } from "@prisma/client";
import { IExpensesRepository } from "./expenses-repository-interface";
import { Expense } from "../models/expense";

const prisma = new PrismaClient();

export class ExpensesRepository implements IExpensesRepository {
  async create(expenseData: Omit<Expense, "id">): Promise<Expense> {
    const newExpense = await prisma.expense.create({
      data: expenseData,
    });

    return { ...newExpense, amount: newExpense.amount.toNumber() };
  }

  async findAllByUser(userId: string): Promise<Expense[]> {
    const expenses = await prisma.expense.findMany({
      where: { userId },
    });

    return expenses.map((expense) => ({ ...expense, amount: expense.amount.toNumber() }));
  }

  async findById(id: string): Promise<Expense | null> {
    const expense = await prisma.expense.findUnique({
      where: { id },
    });

    if (!expense) return null;

    return { ...expense, amount: expense.amount.toNumber() };
  }

  async update(id: string, updatedData: Partial<Expense>): Promise<Expense> {
    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: updatedData,
    });
    return { ...updatedExpense, amount: updatedExpense.amount.toNumber() };
  }

  async delete(id: string): Promise<Expense> {
    const deletedExpense = await prisma.expense.delete({
      where: { id },
    });
    return { ...deletedExpense, amount: deletedExpense.amount.toNumber() };
  }
}
