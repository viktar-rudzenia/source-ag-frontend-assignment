import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import ContentWrapper from '@/layout/ContentWrapper';
import AppWrapper from '@/layout/AppWrapper';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';

import '@/styles/globals.scss';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Source-ag-frontend-assignment',
  description: 'Source ag frontend assignment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className} suppressHydrationWarning={true}>
        <AppWrapper>
          <Header />
          <ContentWrapper>{children}</ContentWrapper>
          <Footer />
        </AppWrapper>
      </body>
    </html>
  );
}
