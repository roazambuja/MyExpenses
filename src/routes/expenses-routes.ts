import { Router } from "express";
import { ExpensesController } from "../controllers/expenses-controller";

const router = Router();
const controller = new ExpensesController();

router.post("/", async (req, res) => {
  await controller.create(req, res);
});

export default router;
