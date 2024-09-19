import { useAnimalInfoSidoCount } from 'front/hooks';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { Sido } from 'front/new-types/responseAPI';
import './scroll.scss';

type Props = {
  items: Sido[];
};

export const CountList = (props: Props) => {
  const { items } = props;
  const query = useAnimalInfoSidoCount(items);

  return (
    <div className="w-[95vw] flex snap-x snap-mandatory overflow-x-auto">
      <div className="flex gap-6 animate-scroll">
        {query?.map((result) => {
          if (result.data?.sido.orgCd === '') return null;
          return (
            <div className="snap-start shrink-0">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div
                    className={`w-7 rounded ${
                      result.isLoading ? 'skeleton' : ''
                    }`}
                  >
                    {result.isLoading ? null : (
                      <img
                        src={`${import.meta.env.BASE_URL}logo/${
                          result.data?.sido.orgCd
                        }.png`}
                        alt="logo"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div
                    className={`font-bold ${
                      result.isLoading ? 'skeleton w-full' : ''
                    }`}
                  >
                    {result.isLoading ? null : result.data?.sido.orgdownNm}
                  </div>
                  <div
                    className={`text-sm opacity-50 ${
                      result.isLoading ? 'skeleton w-full' : ''
                    }`}
                  >
                    {result.isLoading ? null : result.data?.totalCount}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {query?.map((result) => {
          if (result.data?.sido.orgCd === '') return null;
          return (
            <div aria-hidden className="snap-start shrink-0">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div
                    className={`w-7 rounded ${
                      result.isLoading ? 'skeleton' : ''
                    }`}
                  >
                    {result.isLoading ? null : (
                      <img
                        src={`${import.meta.env.BASE_URL}logo/${
                          result.data?.sido.orgCd
                        }.png`}
                        alt="logo"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div
                    className={`font-bold ${
                      result.isLoading ? 'skeleton w-full' : ''
                    }`}
                  >
                    {result.isLoading ? null : result.data?.sido.orgdownNm}
                  </div>
                  <div
                    className={`text-sm opacity-50 ${
                      result.isLoading ? 'skeleton w-full' : ''
                    }`}
                  >
                    {result.isLoading ? null : result.data?.totalCount}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
