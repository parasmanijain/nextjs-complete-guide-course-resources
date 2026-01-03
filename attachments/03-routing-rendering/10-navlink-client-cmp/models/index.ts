import { ReactNode } from 'react';

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string; // ISO date string (YYYY-MM-DD)
  content: string;
}

export interface SlugParams {
  params: Promise<{ slug: string }>;
}

export interface FiltersParams {
  params: Promise<{ filter: string[] }>;
}

export interface NavLinkProps {
  href: string;
  children: ReactNode;
}
