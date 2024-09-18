import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';
import { useAnimalInfoInfinity } from 'front/hooks';
import { AnimalCard } from './card';
import InfiniteScroll from 'react-infinite-scroller';

type Props = {
  animalInfoRequest: AnimalInfoRequestType | null;
};

export const SearchView = (props: Props) => {
  const { animalInfoRequest } = props;
  const { data, fetchNextPage, hasNextPage } =
    useAnimalInfoInfinity(animalInfoRequest);

  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      loadMore={() => {
        fetchNextPage();
      }}
      loader={<progress key={uuidv4()} className="progress"></progress>}
      useWindow={false}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {data?.pages?.map((animalInfo) =>
          animalInfo?.response.body.items.item?.map((animal) => {
            return <AnimalCard key={uuidv4()} item={animal} />;
          })
        ) ?? <div></div>}
      </div>
    </InfiniteScroll>
  );
};
