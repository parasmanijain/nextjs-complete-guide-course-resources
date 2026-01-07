import { Posts } from '@/components/Posts';
import { getPosts } from '@/lib/posts';
import { PostWithMeta } from '@/models';

export async function generateMetadata() {
  const posts = await getPosts() as PostWithMeta[];
  const numberOfPosts = posts.length;
  return {
    title: `Browse all our ${numberOfPosts} posts.`,
    description: 'Browse all our posts.'
  }
}

export default async function FeedPage() {
  const posts = await getPosts() as PostWithMeta[];
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
