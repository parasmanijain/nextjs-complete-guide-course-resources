import { notFound } from 'next/navigation';
import { ModalBackdrop } from '@/components/ModalBackdrop';
import { getNewsItem } from '@/lib/news';
import { NewsItem, SlugParams } from '@/models';

export default async function InterceptedImagePage({ params }: SlugParams) {
  const { slug } = await params;
  const newsItem = await getNewsItem(slug) as NewsItem;

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
