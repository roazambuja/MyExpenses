import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import { JWT_SECRET } from "../config/env";

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateToken(user: User): string {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
