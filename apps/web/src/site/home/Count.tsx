'use client';

import { useAnimalInfoSidoCount } from 'front/hooks';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { Sido } from '@animal-project/shared-types';
import InfiniteLoopSlider from './InfiniteLoop';
import './infinity.scss';
import { Avatar, AvatarImage } from 'front/components/ui/avatar';
import { Skeleton } from 'front/components/ui/skeleton';

type Props = {
  items: Sido[];
};

export const CountList = (props: Props) => {
  const { items } = props;
  const query = useAnimalInfoSidoCount(items);

  return (
    <InfiniteLoopSlider onHoverStop>
      {query?.map((result) => {
        if (result.data?.sido.orgCd === '') return null;
        return (
          <div className="shrink-0" key={uuidv4()}>
            <div className="flex items-center gap-3">
              {result.isLoading ? (
                <Skeleton className="h-7 w-7 rounded bg-primary-foreground/20" />
              ) : (
                <Avatar className="h-7 w-7 rounded">
                  <AvatarImage
                    src={`/logo/${result.data?.sido.orgCd}.png`}
                    alt="logo"
                  />
                </Avatar>
              )}
              <div>
                {result.isLoading ? (
                  <Skeleton className="h-4 w-16 bg-primary-foreground/20" />
                ) : (
                  <div className="font-bold">
                    {result.data?.sido.orgdownNm}
                  </div>
                )}
                {result.isLoading ? (
                  <Skeleton className="mt-1 h-3 w-12 bg-primary-foreground/20" />
                ) : (
                  <div className="text-sm opacity-50">
                    {result.data?.totalCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </InfiniteLoopSlider>
  );
};
