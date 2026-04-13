'use client';

import { useLikeStore } from 'front/hooks/store';
import React from 'react';
import { AnimalCard } from '../search/card';
import { v4 as uuidv4 } from 'uuid';

type Props = Record<string, never>;

export const LikeView = (_props: Props) => {
  const { likes } = useLikeStore();

  if (!likes?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <span className="mb-3 text-5xl">🐾</span>
        <p className="text-sm">북마크한 동물이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {likes.map((animalInfo) => (
        <AnimalCard key={animalInfo.desertionNo ?? uuidv4()} item={animalInfo} />
      ))}
    </div>
  );
};
