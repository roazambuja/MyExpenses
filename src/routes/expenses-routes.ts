import { Router } from "express";
import { ExpensesController } from "../controllers/expenses-controller";

const router = Router();
const controller = new ExpensesController();

router.post("/", async (req, res) => {
  await controller.create(req, res);
});

router.get("/", async (req, res) => {
  await controller.getAllByUser(req, res);
});

router.get("/:id", async (req, res) => {
  await controller.getById(req, res);
});

router.put("/:id", async (req, res) => {
  await controller.update(req, res);
});

export default router;
