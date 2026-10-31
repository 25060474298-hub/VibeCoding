import { eq } from "drizzle-orm";
import { db } from "../db";
import { users, type User } from "../db/schema";
import type { CreateUserInput, UpdateUserInput } from "../types";

export class UserService {
  static async getAll(): Promise<User[]> {
    return await db.select().from(users);
  }

  static async getById(id: number): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user ?? null;
  }

  static async create(data: CreateUserInput): Promise<User> {
    const [result] = await db.insert(users).values(data);
    const newId = Number(result.insertId);
    const createdUser = await this.getById(newId);
    if (!createdUser) {
      throw new Error("Failed to retrieve created user");
    }
    return createdUser;
  }

  static async update(id: number, data: UpdateUserInput): Promise<User | null> {
    const existing = await this.getById(id);
    if (!existing) {
      return null;
    }

    if (Object.keys(data).length > 0) {
      await db.update(users).set(data).where(eq(users.id, id));
    }

    return await this.getById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const existing = await this.getById(id);
    if (!existing) {
      return false;
    }

    const [result] = await db.delete(users).where(eq(users.id, id));
    return (result.affectedRows ?? 0) > 0;
  }
}
