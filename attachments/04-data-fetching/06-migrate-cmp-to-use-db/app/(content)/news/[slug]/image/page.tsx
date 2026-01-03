import { notFound } from 'next/navigation';
import { getNewsItem } from '@/lib/news';
import { NewsItem, SlugParams } from '@/models';

export default async function ImagePage({ params }: SlugParams) {
  const { slug } = await params;
  const newsItem = await getNewsItem(slug) as NewsItem;

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
