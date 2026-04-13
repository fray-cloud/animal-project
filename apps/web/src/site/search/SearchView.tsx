import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { AnimalInfoRequestType } from '@animal-project/shared-types';
import { useAnimalInfoInfinity } from 'front/hooks';
import { AnimalCard } from './card';
import InfiniteScroll from 'react-infinite-scroller';
import { PawLoader, SearchLoadingGrid } from 'front/components/ui/loading';

type Props = {
  animalInfoRequest: AnimalInfoRequestType | null;
};

export const SearchView = ({ animalInfoRequest }: Props) => {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useAnimalInfoInfinity(animalInfoRequest);

  if (isLoading && animalInfoRequest) {
    return <SearchLoadingGrid />;
  }

  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      loadMore={() => fetchNextPage()}
      loader={<PawLoader key="loader" className="py-6" />}
      useWindow={false}
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {data?.pages?.flatMap((page) =>
          page?.response.body.items.item?.map((animal) => (
            <AnimalCard key={animal.desertionNo ?? uuidv4()} item={animal} />
          ))
        ) ?? null}
      </div>
    </InfiniteScroll>
  );
};
