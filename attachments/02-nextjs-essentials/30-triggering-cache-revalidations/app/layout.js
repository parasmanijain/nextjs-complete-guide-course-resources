import {MainHeader} from '@/components/main-header/MainHeader';
import './globals.scss';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
