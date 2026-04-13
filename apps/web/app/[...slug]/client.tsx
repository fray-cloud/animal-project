'use client';

import dynamic from 'next/dynamic';

const LegacyAppWrapper = dynamic(() => import('./legacy-app-wrapper'), {
  ssr: false,
});

export function ClientOnly() {
  return <LegacyAppWrapper />;
}
