'use client';

import { BrowserRouter } from 'react-router-dom';
import Header from 'front/new-component/header';
import { Bottom } from 'front/new-component';
import HomePage from 'front/new-site/home';
import { Providers } from './providers';

export default function HomeTree() {
  return (
    <Providers>
      <BrowserRouter>
        <div className="flex max-max-h-screen max-w-screen max-w-screen">
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-4 flex-1">
              <HomePage />
            </main>
          </div>
          <Bottom />
        </div>
      </BrowserRouter>
    </Providers>
  );
}
