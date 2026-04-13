'use client';

import dynamic from 'next/dynamic';

const SearchTree = dynamic(() => import('./search-tree'), { ssr: false });

export function SearchClient() {
  return <SearchTree />;
}
