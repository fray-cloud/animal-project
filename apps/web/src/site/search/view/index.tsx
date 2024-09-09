import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useQueryAbandonment } from '../../function/query';
import InfiniteScroll from 'react-infinite-scroller';

import ViewCard from './viewCard';
import DetailModalView from './detailModal';

import { AbandonmentPublic } from '../../../api/callAPI';
import { Stack, LinearProgress, Grid, Box, Typography } from '@mui/joy';

const SearchView = () => {
  const { formState, getValues, trigger } = useFormContext();
  const { data, update, queryInfo } = useQueryAbandonment(getValues());

  const [detailData, SetDetailData] = useState<AbandonmentPublic>();
  const [modalShow, SetModalShow] = useState(false);

  useEffect(() => {
    if (formState.isSubmitting) {
      console.log('useEffect update');
      update(getValues());
    }
  }, [trigger()]);

  return (
    <>
      <DetailModalView
        isShow={modalShow}
        setShow={SetModalShow}
        data={detailData}
      />
      {formState.isSubmitted ? (
        <InfiniteScroll
          hasMore={queryInfo.hasNextPage}
          loadMore={() => {
            console.log('..??');
            queryInfo.fetchNextPage();
          }}
          loader={<LinearProgress key={'load-progress'} thickness={2} />}
        >
          {queryInfo.isFetching && !queryInfo.isFetchingNextPage ? (
            <LinearProgress thickness={2} />
          ) : (
            <LinearProgress thickness={2} value={0} />
          )}
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            // columns={{ xs: 6, sm: 4, md: 4 }}
            direction={'row'}
            alignContent={'flex-start'}
            justifyContent={'flex-start'}
            sx={{ width: '100%' }}
          >
            {data?.pages?.map((data, index) =>
              data?.response.body.items.item?.map((res, idx) => {
                return (
                  <Grid key={`grid-${idx}`} xs={12} sm={6} md={4}>
                    <ViewCard
                      idx={idx}
                      data={res}
                      setModalShow={SetModalShow}
                      setDetailData={SetDetailData}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
        </InfiniteScroll>
      ) : null}
    </>
  );
};

export default SearchView;
