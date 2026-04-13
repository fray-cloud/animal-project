'use client';

import { useSido } from 'front/hooks';
import { CountList } from 'front/site/home/Count';
import { initSido } from 'front/site/search/select/initData';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'front/components/ui/button';

const Header: React.FC = () => {
  const { data } = useSido({ init: initSido });
  const router = useRouter();
  return (
    <div className="flex items-center justify-between gap-4 bg-neutral-900 px-4 py-2 text-neutral-100">
      <div className="flex-1">
        <Button
          variant="ghost"
          className="h-auto px-3 py-1 text-xl text-neutral-100 hover:bg-neutral-800 hover:text-neutral-100"
          onClick={() => router.push('/')}
        >
          유기동물 조회 서비스
        </Button>
      </div>
      <div className="flex-none">
        <CountList items={data} />
      </div>
    </div>
  );
};

export default Header;
