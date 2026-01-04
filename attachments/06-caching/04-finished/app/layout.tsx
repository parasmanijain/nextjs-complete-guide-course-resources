import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import './globals.scss';

export const metadata = {
  title: 'Next.js Caching',
  description: 'Learn how Next.js caching works',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
