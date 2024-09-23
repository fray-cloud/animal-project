import React from 'react';
import Header from 'front/new-component/header';

import 'front/app/app.module.scss';
import SiteRouter from 'front/route';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Bottom } from 'front/new-component';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex max-max-h-screen max-w-screen max-w-screen">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 flex-1">{children}</main>
      </div>
      <Bottom />
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <SiteRouter />
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
