import React, { createContext, useState } from 'react';

import Footer from '../components/footer';
import { Grid, Stack } from '@mui/joy';
import Header from '../components/header';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Search from '@mui/icons-material/Search';

import SiteRouter from '../route';
import { useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface IRemoteContext {
  name: string;
  icon: React.ReactElement;
  color: 'primary' | 'danger' | 'success' | 'warning';
  route: string;
}

interface IContext {
  selectIndex: number;
  selectRemote: React.Dispatch<number>;
  context: IRemoteContext[];
}

export const RemoteContext = createContext<IContext | null>(null);

const App = () => {
  const queryClient = new QueryClient();

  const defaultRemoteContext: IRemoteContext[] = [
    {
      name: '홈',
      icon: <HomeRoundedIcon />,
      color: 'primary',
      route: '',
    },
    {
      name: '조회',
      icon: <Search />,
      color: 'warning',
      route: 'search',
    },
    {
      name: '좋아요',
      icon: <FavoriteBorder />,
      color: 'danger',
      route: 'likes',
    },
  ];

  const location = useLocation();
  const defaultIndex = defaultRemoteContext.findIndex(
    (value) => value.route == location.pathname.split('/')[1]
  );
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const defaultContext = {
    selectIndex: selectedIndex,
    selectRemote: setSelectedIndex,
    context: defaultRemoteContext,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RemoteContext.Provider value={defaultContext}>
        <Stack
          direction={'column'}
          spacing={2}
          alignContent={'stretch'}
          justifyContent={'center'}
        >
          <Grid container>
            <Header />
          </Grid>
          <SiteRouter />
          <Grid
            container
            sx={{
              bottom: 20,
              width: '100%',
              position: 'fixed',
            }}
          >
            <Footer />
          </Grid>
        </Stack>
      </RemoteContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
