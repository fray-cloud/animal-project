'use client';

import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from 'front/new-component/header';
import { Bottom } from 'front/new-component';
import { Providers } from './providers';

export default function RouteShell({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <BrowserRouter>
        <div className="flex max-max-h-screen max-w-screen max-w-screen">
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-4 flex-1">{children}</main>
          </div>
          <Bottom />
        </div>
      </BrowserRouter>
    </Providers>
  );
}
