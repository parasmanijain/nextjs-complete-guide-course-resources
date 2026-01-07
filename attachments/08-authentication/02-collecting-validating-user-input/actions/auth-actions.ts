'use server';

export async function signup(_: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  let errors = {};

  if (!email.includes('@')) {
    errors.email = 'Please enter a valid email address.';
  }

  if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  // store it in the database (create a new user)
}
