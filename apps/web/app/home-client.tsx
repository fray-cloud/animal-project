'use client';

import dynamic from 'next/dynamic';

const HomeTree = dynamic(() => import('./home-tree'), { ssr: false });

export function HomeClient() {
  return <HomeTree />;
}
