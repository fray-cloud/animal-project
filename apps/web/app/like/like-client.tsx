'use client';

import dynamic from 'next/dynamic';

const LikeTree = dynamic(() => import('./like-tree'), { ssr: false });

export function LikeClient() {
  return <LikeTree />;
}
