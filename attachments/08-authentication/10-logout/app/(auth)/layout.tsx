import { ReactNode } from 'react';
import { logout } from '@/actions/auth-actions';
import '../globals.scss';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

export default function AuthRootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header id="auth-header">
        <p>Welcome back!</p>
        <form action={logout}>
          <button>Logout</button>
        </form>
      </header>
      {children}
    </>
  );
}
