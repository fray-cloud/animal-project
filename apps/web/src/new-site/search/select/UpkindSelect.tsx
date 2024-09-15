import { useSido } from 'front/hooks';
import React from 'react';
import { initSido, Upkinds } from './initData';
import { UseFormRegister } from 'react-hook-form';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';

type Props = {
  register: UseFormRegister<AnimalInfoRequestType>;
};

export const UpkindSelect = (props: Props) => {
  const { register } = props;

  return (
    <select {...register('upkind')}>
      {Upkinds.map((upkind, index) => {
        return (
          <option key={index} value={upkind.upkind}>
            {upkind.upKindNm}
          </option>
        );
      })}
    </select>
  );
};
