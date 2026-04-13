import type { ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';
import Header from 'front/components/header';
import { Bottom } from 'front/components';

export const metadata = {
  title: 'Animal Project',
  description: '유기동물 공공데이터 조회',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main
              className="flex-1"
              style={{
                paddingTop: 'calc(48px + max(env(safe-area-inset-top, 0px), 0px))',
                paddingBottom: 'calc(49px + env(safe-area-inset-bottom, 0px))',
              }}
            >
              <div className="mx-auto w-full max-w-2xl px-4 py-4">
                {children}
              </div>
            </main>
            <Bottom />
          </div>
        </Providers>
      </body>
    </html>
  );
}
