import React from 'react';
import { Grid, Stack } from '@mui/joy';
import SearchForm from './form';
import SearchView from './view';
import { useFormAbandonment } from '../function/form';
import { FormProvider } from 'react-hook-form';

const Search = () => {
  const methods = useFormAbandonment();

  return (
    <FormProvider {...methods}>
      <Stack
        spacing={1}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-evenly"
        alignContent={'stretch'}
      >
        <Grid
          sx={{
            width: { md: '23vw' },
            height: { md: '82vh' },
            border: '1px dashed green',
          }}
        >
          <SearchForm />
        </Grid>
        <Grid
          spacing={1}
          sx={{
            width: { md: '75vw' },
            height: '82vh',
            border: '1px dashed red',
            overflow: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <SearchView />
        </Grid>
      </Stack>
    </FormProvider>
  );
};

export default Search;
