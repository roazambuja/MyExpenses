import { ExpensesRepository } from "./repositories/expenses-repository-memory";
import { UsersRepository } from "./repositories/users-repository-prisma";
import { ExpensesService } from "./services/expenses-service";
import { UsersService } from "./services/users-service";

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);

const expensesRepository = new ExpensesRepository();
const expensesService = new ExpensesService(expensesRepository);

export { usersService, expensesService };
