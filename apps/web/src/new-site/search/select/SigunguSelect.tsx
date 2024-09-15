import { useSigungu } from 'front/hooks';
import React from 'react';
import { initSigungu } from './initData';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';
import { Select, SelectProps, SelectWatchProps } from './Select';

export const SigunguSelect = (props: SelectProps & SelectWatchProps) => {
  const { register, watch, name } = props;
  const sigungus = useSigungu({
    upr_cd: watch('upr_cd'),
    init: initSigungu,
  });
  return (
    <Select labelName="시군구" register={register} name={name}>
      {sigungus.data?.map((sigungu, index) => {
        return (
          <option key={index} value={sigungu.orgCd}>
            {sigungu.orgdownNm}
          </option>
        );
      })}
    </Select>
  );
};
