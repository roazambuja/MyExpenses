import { z } from "zod";

export const expenseSchema = z.object({
  id: z.string().uuid("Expense ID must be a valid UUID."),

  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be positive"),

  category: z
    .string()
    .min(3, "Category must have at least 3 characters")
    .max(30, "Category must have at most 30 characters"),

  date: z.coerce
    .date({
      required_error: "Date is required",
      invalid_type_error: "Date must be a valid date",
    })
    .refine((date) => date <= new Date(), { message: "Date can't be in the future." }),

  type: z.enum(["expense", "income"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be either 'expense' or 'income'",
  }),

  user: z.string().uuid("User ID must be a valid UUID."),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });

export const updateExpenseSchema = createExpenseSchema.partial();
