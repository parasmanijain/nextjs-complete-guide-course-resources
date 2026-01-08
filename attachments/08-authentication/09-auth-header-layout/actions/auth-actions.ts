'use server';

import { redirect } from 'next/navigation';
import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { createUser, getUserByEmail } from '@/lib/user';
import { createAuthSession } from '@/lib/auth';
import { AuthMode } from '@/models';

export interface SignupErrors {
  email?: string;
  password?: string;
}

export interface SignupFormState {
  errors?: SignupErrors;
}

/**
 * SQLite error shape for constraint violations
 */
interface SqliteError extends Error {
  code?: string;
}

/**
 * Signup Server Action
 */
export async function signup(
  _: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  const errors: SignupErrors = {};

  if (!email.includes('@')) {
    errors.email = 'Please enter a valid email address.';
  }

  if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(String(id));
    redirect('/training');
  } catch (err: unknown) {
    const error = err as SqliteError;

    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return {
        errors: {
          email:
            'It seems like an account for the chosen email already exists.',
        },
      };
    }

    throw error;
  }
}

/**
 * Login Server Action
 */
export async function login(
  _: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: 'Could not authenticate user, please check your credentials.',
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: 'Could not authenticate user, please check your credentials.',
      },
    };
  }

  await createAuthSession(String(existingUser.id));
  redirect('/training');
}

/**
 * Unified Auth Action (login/signup)
 */
export async function auth(
  mode: AuthMode,
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  if (mode === 'login') {
    return login(prevState, formData);
  }

  return signup(prevState, formData);
}
