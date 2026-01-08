'use server';

export interface SignupErrors {
  email?: string;
  password?: string;
}

export interface SignupFormState {
  errors?: SignupErrors;
}

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

  // TODO: Store user in database

  return {};
}
