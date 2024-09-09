import React from 'react';
import { Grid, Stack, Box } from '@mui/joy';
import SidoList from './sidoList';
import AbandonmentInfomation from './exampleBox';

const Home = () => {
  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-evenly"
      alignContent={'stretch'}
    >
      <Grid
        container
        sx={{
          width: { md: '35vw' },
          height: '82vh',
          border: '1px dashed green',
        }}
      >
        <SidoList />
      </Grid>
      <Grid
        container
        sx={{
          width: { md: '52vw' },
          height: '82vh',
          border: '1px dashed red',
        }}
      >
        <AbandonmentInfomation />
      </Grid>
    </Stack>
  );
};

export default Home;
