import React, { useEffect, useMemo, useState } from 'react';
import { SearchForm } from './Form';
import { SearchView } from './SearchView';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';
import { useAnimalInfo } from 'front/hooks';

export const SearchPage = () => {
  const [animalInfoRequest, SetAnimalInfoRequest] =
    useState<AnimalInfoRequestType | null>(null);

  return (
    <>
      <SearchForm
        submitHandler={(data) => {
          SetAnimalInfoRequest(data);
        }}
      />
      <SearchView animalInfoRequest={animalInfoRequest} />
    </>
  );
};
