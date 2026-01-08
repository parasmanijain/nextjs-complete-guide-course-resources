import { AuthForm } from '@/components/AuthForm';
import { AuthMode } from '@/models';

interface HomeProps {
  searchParams: Promise<{
    mode?: AuthMode;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const formMode = params.mode ?? 'login';
  return <AuthForm mode={formMode} />;
}
