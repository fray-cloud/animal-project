import SearchRouter from 'front/new-site/search';
import { useRoutes, RouteObject } from 'react-router-dom';
import LikeRouter from 'front/new-site/like';

// `/` is handled by the file-system route at apps/web/app/page.tsx.
// This router owns only the routes still served by the catch-all bridge
// (#7 migration) until #33/#34 port them to file-system routes.
const SiteRouter = () => {
  const router: RouteObject[] = [...SearchRouter, ...LikeRouter];
  return useRoutes(router);
};

export default SiteRouter;
