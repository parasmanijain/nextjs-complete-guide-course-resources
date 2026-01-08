import { AuthForm } from '@/components/AuthForm';

export default async function Home({ searchParams }: HomeProps) {
  const formMode = searchParams.mode || 'login';
  return <AuthForm mode={formMode} />;
}
