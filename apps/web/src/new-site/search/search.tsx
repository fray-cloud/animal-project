import React, { useRef, useState } from 'react';
import { SearchForm } from './Form';
import { SearchView } from './SearchView';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';
import { motion, useScroll } from 'framer-motion';

export const SearchPage = () => {
  const [animalInfoRequest, SetAnimalInfoRequest] =
    useState<AnimalInfoRequestType | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });

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
        <motion.div
          className="col-span-full top-0 left-0 right-0 h-1 bg-green-500 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        <div
          className="col-span-full h-[60vh] overflow-auto scrollbar-hide"
          ref={scrollRef}
        >
          <SearchView animalInfoRequest={animalInfoRequest} />
        </div>
      </div>
    </>
  );
};
