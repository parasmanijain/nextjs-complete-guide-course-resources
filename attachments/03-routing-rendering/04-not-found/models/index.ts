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
