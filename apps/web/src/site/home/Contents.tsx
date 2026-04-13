'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'front/components/ui/button';

type Props = Record<string, never>;

const SearchContentsItem = () => {
  const router = useRouter();
  return (
    <div
      className="relative -mx-4 -mt-4 overflow-hidden"
      style={{ minHeight: 'calc(100dvh - 97px)' }}
    >
      {/* Warm decorative blobs — full coverage */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: 'hsl(36 100% 85%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: 'hsl(28 92% 53%)' }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
        style={{ background: 'hsl(14 26% 29%)' }}
      />

      {/* Hero — vertically centered */}
      <div className="relative flex h-full min-h-[calc(100dvh-97px)] flex-col items-center justify-center px-6 py-14 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm text-secondary-foreground">
          <span>🐾</span>
          <span>전국 유기동물 보호소 정보</span>
        </div>

        {/* Main heading */}
        <h1
          className="mb-6 text-5xl font-black leading-tight tracking-tight text-primary"
          style={{ letterSpacing: '-0.03em' }}
        >
          당신이<br />
          반려자가 될<br />
          수 있습니다.
        </h1>

        {/* Sub copy */}
        <p className="mb-2 text-muted-foreground">
          여기 돌봄이 필요한 동물들이 있습니다.
        </p>
        <p className="mb-10 text-muted-foreground">
          당신의 책임있는 사랑이 그들의 삶을 바꿀 수 있습니다.
        </p>

        {/* CTA */}
        <Button
          onClick={() => router.push('/search')}
          className="h-14 rounded-full bg-accent px-10 text-lg text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent/90"
        >
          유기동물 찾아보기 →
        </Button>
      </div>
    </div>
  );
};

export const Contents = (_props: Props) => {
  return <SearchContentsItem />;
};
