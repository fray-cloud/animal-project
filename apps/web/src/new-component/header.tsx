'use client';

import { useSido } from 'front/hooks';
import { CountList } from 'front/new-site/home/Count';
import { initSido } from 'front/new-site/search/select/initData';
import React from 'react';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const { data } = useSido({ init: initSido });
  const router = useRouter();
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={() => router.push('/')}>
          유기동물 조회 서비스
        </a>
      </div>
      <div className="flex-none">
        <CountList items={data} />
      </div>
    </div>
  );
};

export default Header;
