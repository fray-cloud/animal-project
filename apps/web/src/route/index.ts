import SearchRouter from 'front/new-site/search';
import React from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
const SiteRouter = () => {
  const router: RouteObject[] = [
    {
      path: '/',
      children: [...SearchRouter],
    },
  ];
  return useRoutes(router);
};

export default SiteRouter;
