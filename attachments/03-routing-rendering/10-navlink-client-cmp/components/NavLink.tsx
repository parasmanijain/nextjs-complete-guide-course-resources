'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLinkProps } from '@/models';

export const NavLink = ({ href, children }: NavLinkProps) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={path.startsWith(href) ? 'active' : undefined}
    >
      {children}
    </Link>
  );
}
