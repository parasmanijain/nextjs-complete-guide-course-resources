import { ReactNode } from 'react';

export interface MealItemProps {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
}

export interface MealSlugParams {
  params: Promise<{ mealSlug: string }>;
}

export interface NavLinkProps {
  href: string;
  children: ReactNode;
}
