import crypto from 'node:crypto';

/**
 * Hashes a password using scrypt with a random salt.
 * Returns value in format: hash:salt
 */
export function hashUserPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(password, salt, 64) as Buffer;
  return `${hashedPassword.toString('hex')}:${salt}`;
}

/**
 * Verifies a password against a stored hash.
 */
export function verifyPassword(
  storedPassword: string,
  suppliedPassword: string
): boolean {
  const [hashedPassword, salt] = storedPassword.split(':');
  if (!hashedPassword || !salt) {
    return false;
  }
  const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
  const suppliedPasswordBuf = crypto.scryptSync(
    suppliedPassword,
    salt,
    64
  ) as Buffer;
  return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}
