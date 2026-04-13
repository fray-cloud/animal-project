'use client';

import { SearchPage } from 'front/new-site/search/search';
import RouteShell from '../route-shell';

export default function SearchTree() {
  return (
    <RouteShell>
      <SearchPage />
    </RouteShell>
  );
}
