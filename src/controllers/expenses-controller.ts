import { Request, Response } from "express";
import { expensesService } from "../container";
import { ExpensesService } from "../services/expenses-service";
import { createExpenseSchema, updateExpenseSchema } from "../schemas/expenses-schema";

export class ExpensesController {
  private service: ExpensesService;

  constructor() {
    this.service = expensesService;
  }

  async create(req: Request, res: Response): Promise<Response> {
    const parsedBody = createExpenseSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json(parsedBody.error.flatten().fieldErrors);
    }

    const created = await this.service.create(parsedBody.data, req.user!.id);
    return res.status(201).json({ created });
  }

  async getAllByUser(req: Request, res: Response): Promise<Response> {
    const expenses = await this.service.findAllByUser(req.user!.id);
    return res.json({ expenses });
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const expense = await this.service.getById(id, req.user!.id);
    return res.json({ expense });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const parsedBody = updateExpenseSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json(parsedBody.error.flatten().fieldErrors);
    }

    const updated = await this.service.update(id, parsedBody.data, req.user!.id);
    return res.json({ updated });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const deleted = await this.service.delete(id, req.user!.id);
    return res.status(200).json({ deleted });
  }
}
