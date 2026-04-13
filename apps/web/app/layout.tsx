import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Animal Project',
  description: '유기동물 공공데이터 조회',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
