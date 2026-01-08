import { User } from '@/models';
import db from './db';

export function createUser(email: string, password: string) {
  const result = db
    .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
    .run(email, password);
  return result.lastInsertRowid;
}

/**
 * Fetch user by email
 */
export function getUserByEmail(email: string): User | null {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as
    | User
    | undefined;

  return user ?? null;
}
