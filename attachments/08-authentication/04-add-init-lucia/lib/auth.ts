import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';

import db from './db';

/**
 * Lucia adapter for better-sqlite3
 */
export const adapter = new BetterSqlite3Adapter(db, {
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
