import React, { useState } from 'react';
import { SearchForm } from './Form';
import { SearchView } from './SearchView';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';

export const SearchPage = () => {
  const [animalInfoRequest, SetAnimalInfoRequest] =
    useState<AnimalInfoRequestType | null>(null);

  return (
    <>
      <div className="grid grid-flow-col">
        <div className="col-span-full">
          <SearchForm
            submitHandler={(data) => {
              SetAnimalInfoRequest(data);
            }}
          />
        </div>
        <div className="col-span-full h-[60vh] overflow-auto">
          <SearchView animalInfoRequest={animalInfoRequest} />
        </div>
      </div>
    </>
  );
};
