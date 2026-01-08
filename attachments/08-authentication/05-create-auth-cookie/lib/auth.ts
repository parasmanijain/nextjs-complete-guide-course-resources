import { cookies } from 'next/headers';
import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';

import db from './db';

/**
 * Lucia adapter for better-sqlite3
 */
const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions',
});

/**
 * Lucia auth instance
 */
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

/**
 * Creates a session and sets auth cookie
 */
export async function createAuthSession(userId: string): Promise<void> {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookieStore = await cookies();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
