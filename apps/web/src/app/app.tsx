import React, { useState } from 'react';
import Sidebar from 'front/new-component/sidebar';
import Header from 'front/new-component/header';

import 'front/app/app.module.scss';

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
  return (
    <Layout>
      <div>Content goes here...</div>
    </Layout>
  );
};

export default App;
