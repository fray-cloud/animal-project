'use client';

import HomePage from 'front/new-site/home';
import RouteShell from './route-shell';

export default function HomeTree() {
  return (
    <RouteShell>
      <HomePage />
    </RouteShell>
  );
}
