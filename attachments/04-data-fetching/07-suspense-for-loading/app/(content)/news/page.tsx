import { NewsList } from '@/components/NewsList';
import { getAllNews } from '@/lib/news';
import { NewsItem } from '@/models';

export default async function NewsPage() {
  const news = await getAllNews() as NewsItem[];

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}
