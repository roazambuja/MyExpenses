import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/error-handler";
import dotenv from "dotenv";
import authRoutes from "./routes/auth-routes";
import usersRoutes from "./routes/users-routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Bem-vindo a API MyExpenses!" });
});

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
