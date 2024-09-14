import React, { useState } from 'react';
import Sidebar from 'front/new-component/sidebar';
import Header from 'front/new-component/header';

import 'front/app/app.module.scss';
import SiteRouter from 'front/route';
import { Outlet, Route, Routes } from 'react-router-dom';
import SearchRouter from 'front/new-site/search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 flex-1">{children}</main>
      </div>
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
