import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  PORT: z.coerce.number().int().default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  ADMIN_NAME: z.string().min(1, "ADMIN_NAME is required"),
  ADMIN_PASSWORD: z.string().min(1, "ADMIN_PASSWORD is required"),
  ADMIN_EMAIL: z.string().email("ADMIN_EMAIL must be a valid email"),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const env = {
  JWT_SECRET: parsedEnv.data.JWT_SECRET,
  PORT: parsedEnv.data.PORT,
  NODE_ENV: parsedEnv.data.NODE_ENV,
  DATABASE_URL: parsedEnv.data.DATABASE_URL,
  ADMIN_NAME: parsedEnv.data.ADMIN_NAME,
  ADMIN_PASSWORD: parsedEnv.data.ADMIN_PASSWORD,
  ADMIN_EMAIL: parsedEnv.data.ADMIN_EMAIL,
};
