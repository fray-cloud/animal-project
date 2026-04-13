import type { ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';
import Header from 'front/new-component/header';
import { Bottom } from 'front/new-component';

export const metadata = {
  title: 'Animal Project',
  description: '유기동물 공공데이터 조회',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <div className="flex max-max-h-screen max-w-screen max-w-screen">
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="p-4 flex-1">{children}</main>
            </div>
            <Bottom />
          </div>
        </Providers>
      </body>
    </html>
  );
}
