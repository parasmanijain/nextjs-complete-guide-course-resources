'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { signup, SignupFormState } from '@/actions/auth-actions';
import { AuthMode } from '@/models';

interface AuthFormProps {
  mode: AuthMode;
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const [formState, formAction] = useActionState<SignupFormState, FormData>(
    signup,
    {}
  );

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {Object.entries(formState.errors).map(([key, message]) => (
            <li key={key}>{message}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </p>
      <p>
        {mode === 'login' && (
          <Link href="/?mode=signup">Create an account.</Link>
        )}
        {mode === 'signup' && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
};
