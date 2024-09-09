import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../site/home';
import Search from '../site/search';
import Like from '../site/like';

const SiteRouter = () => {
  return (
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/" element={<Home />} />
      <Route path="/likes" element={<Like />} />
    </Routes>
  );
};

export default SiteRouter;
