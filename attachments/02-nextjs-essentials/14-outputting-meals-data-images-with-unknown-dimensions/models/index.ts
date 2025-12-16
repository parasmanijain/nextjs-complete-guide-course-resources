import { ReactNode } from 'react';

export interface MealItemProps {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
}

export interface NavLinkProps {
  href: string;
  children: ReactNode;
}
