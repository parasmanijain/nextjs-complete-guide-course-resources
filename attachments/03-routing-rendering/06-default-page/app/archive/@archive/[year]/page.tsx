import { NewsList } from '@/components/NewsList';
import { getNewsForYear } from '@/lib/news';

export default function FilteredNewsPage({ params }: { params: { year: number } }) {
  const newsYear = params.year;
  const news = getNewsForYear(newsYear);

  return <NewsList news={news} />
}