'use client';

import { useSido } from 'front/hooks';
import { initSido } from 'front/site/search/select/initData';
import { AnimatedCityCarousel } from 'front/site/home/AnimatedCityCarousel';
import React from 'react';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const { data } = useSido({ init: initSido });
  const router = useRouter();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-primary px-4 text-primary-foreground shadow-md"
      style={{
        paddingTop: 'max(env(safe-area-inset-top, 0px), 10px)',
        paddingBottom: '10px',
      }}
    >
      <div className="mx-auto flex max-w-2xl items-center gap-4">
        {/* 로고 + 캐로셀 (바로 옆) */}
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 hover:opacity-80 transition-opacity"
          onClick={() => router.push('/')}
        >
          <span className="text-xl">🐾</span>
          <span className="text-lg font-bold tracking-tight">유기동물 조회</span>
        </button>

        {/* 구분선 */}
        <div className="h-5 w-px bg-primary-foreground/30" />

        {/* 애니메이션 도시 캐로셀 */}
        <AnimatedCityCarousel items={data ?? []} />
      </div>
    </header>
  );
};

export default Header;
