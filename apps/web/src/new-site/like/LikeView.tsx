import { useLikeStore } from 'front/hooks/store';
import React from 'react';
import { AnimalCard } from '../search/card';
import { v4 as uuidv4 } from 'uuid';

type Props = {};

export const LikeView = (props: Props) => {
  const { likes } = useLikeStore();
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {likes?.map((animalInfo) => {
        return <AnimalCard key={uuidv4()} item={animalInfo} />;
      }) ?? <div></div>}
    </div>
  );
};
