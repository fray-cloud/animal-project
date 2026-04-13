import { RouteObject } from 'react-router-dom';

// /search is now served by the file-system route at
// apps/web/app/search/page.tsx. SearchPage is still imported directly
// from that file-system route via front/new-site/search/search.
const SearchRouter: RouteObject[] = [];

export default SearchRouter;
