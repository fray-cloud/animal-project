import { RouteObject } from 'react-router-dom';
import { SearchPage } from './search';

const SearchRouter: RouteObject[] = [
  {
    path: '/search',
    Component: SearchPage,
  }
];

export default SearchRouter;
