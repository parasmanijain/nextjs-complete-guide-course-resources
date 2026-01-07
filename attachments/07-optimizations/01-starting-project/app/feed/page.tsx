import { Posts } from '@/components/Posts';
import { getPosts } from '@/lib/posts';
import { PostWithMeta } from '@/models';

export default async function FeedPage() {
  const posts = await getPosts() as PostWithMeta[];
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
