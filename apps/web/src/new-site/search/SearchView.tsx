import { AnimalInfo, AnimalInfoResponse } from 'front/new-types/responseAPI';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect } from 'react';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';
import { useAnimalInfoInfinity } from 'front/hooks';

type Props = {
  animalInfoRequest: AnimalInfoRequestType | null;
};

export const SearchView = (props: Props) => {
  const { animalInfoRequest } = props;
  const { data, fetchNextPage } = useAnimalInfoInfinity(animalInfoRequest);

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {data?.pages?.map((animalInfo) =>
          animalInfo?.response.body.items.item?.map((animal) => {
            return (
              <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                  <img src={animal.filename} alt="pet" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Watch</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <button className="btn btn-ghost" onClick={() => fetchNextPage()}>
        더 부르기
      </button>
    </div>
  );
};
