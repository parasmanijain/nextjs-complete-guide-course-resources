import { ReactNode } from 'react';
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
        <form>
          <button>Logout</button>
        </form>
      </header>
      {children}
    </>
  );
}
