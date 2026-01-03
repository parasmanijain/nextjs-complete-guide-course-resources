import { NewsList } from '@/components/NewsList';
import { getNewsForYear } from '@/lib/news';
import { NewsItem } from '@/models';

export default async function FilteredNewsPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const news = getNewsForYear(year) as NewsItem[];

  return <NewsList news={news} />
}