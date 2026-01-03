import sql from 'better-sqlite3';
import { NewsItem } from '@/models';

const db = sql('data.db');

const delay = (ms = 2000) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function getAllNews(): Promise<NewsItem[]> {
  const news = db.prepare('SELECT * FROM news').all() as NewsItem[];
  await delay();
  return news;
}

export async function getNewsItem(slug: string): Promise<NewsItem> {
  const newsItem = db
    .prepare('SELECT * FROM news WHERE slug = ?')
    .get(slug) as NewsItem;
  await delay();
  return newsItem;
}

export async function getLatestNews(): Promise<NewsItem[]> {
  const latestNews = db
    .prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3')
    .all() as NewsItem[];
  await delay();
  return latestNews;
}

export async function getAvailableNewsYears(): Promise<string[]> {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all() as { year: string }[];
  await delay();
  return years.map((year) => year.year);
}

export function getAvailableNewsMonths(year: string): string[] {
  const months = db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year) as { month: string }[];
  return months.map((m) => m.month);
}

export async function getNewsForYear(year: string): Promise<NewsItem[]> {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year) as NewsItem[];
  await delay();
  return news;
}

export async function getNewsForYearAndMonth(
  year: string,
  month: string
): Promise<NewsItem[]> {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month) as NewsItem[];
  await delay();
  return news;
}
