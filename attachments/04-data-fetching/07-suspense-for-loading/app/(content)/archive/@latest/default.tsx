import { NewsList } from '@/components/NewsList';
import { getLatestNews } from '@/lib/news';
import { NewsItem } from '@/models';

export default async function LatestNewsPage() {
  const latestNews = await getLatestNews() as NewsItem[];

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
}
