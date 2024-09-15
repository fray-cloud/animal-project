import { useSido } from 'front/hooks';
import React from 'react';
import { initSido, Upkinds } from './initData';
import { UseFormRegister } from 'react-hook-form';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';
import { Select, SelectProps } from './Select';

export const UpkindSelect = (props: SelectProps) => {
  const { register, name } = props;

  return (
    <Select labelName="대종류" register={register} name={name}>
      {Upkinds.map((upkind, index) => {
        return (
          <option key={index} value={upkind.upkind}>
            {upkind.upKindNm}
          </option>
        );
      })}
    </Select>
  );
};
