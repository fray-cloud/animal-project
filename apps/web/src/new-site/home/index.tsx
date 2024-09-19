import React from 'react';
import { CountList } from './Count';
import { useSido } from 'front/hooks';
import { initSido } from '../search/select/initData';

const HomePage = () => {
  const { data } = useSido({ init: initSido });
  return <CountList items={data} />;
};

export default HomePage;
