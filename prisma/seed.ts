import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { env } from "../src/config/env";
import { hashPassword } from "../src/utils/jwt";

async function main() {
  if (env.NODE_ENV === "development") {
    await prisma.user.deleteMany();
    await prisma.user.create({
      data: {
        name: env.ADMIN_NAME,
        email: env.ADMIN_EMAIL,
        password: hashPassword(env.ADMIN_PASSWORD),
        role: "admin",
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
