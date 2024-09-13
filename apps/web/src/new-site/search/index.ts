import { useRoutes, RouteObject } from 'react-router-dom';
import { SearchPage } from './search';

const SearchRouter: RouteObject[] = [
  {
  path: '/search',
  children: [
    {
      path: '',
      Component: SearchPage,
    },
  ],
}
];

export default SearchRouter;
