import SearchRouter from 'front/new-site/search';
import React from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import HomePage from 'front/new-site/home'
const SiteRouter = () => {
  const router: RouteObject[] = [
    {
      path: '/',
      Component: HomePage,
    },
    ...SearchRouter,
  ];
  return useRoutes(router);
};

export default SiteRouter;
