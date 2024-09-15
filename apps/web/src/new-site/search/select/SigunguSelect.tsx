import { useSigungu } from 'front/hooks';
import React from 'react';
import { initSigungu } from './initData';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';

type Props = {
  register: UseFormRegister<AnimalInfoRequestType>;
  watch: UseFormWatch<AnimalInfoRequestType>;
};

export const SigunguSelect = (props: Props) => {
  const { register, watch } = props;
  const sigungus = useSigungu({
    upr_cd: watch('upr_cd'),
    init: initSigungu,
  });
  return (
    <select {...register('org_cd')}>
      {sigungus.data?.map((sigungu, index) => {
        return (
          <option key={index} value={sigungu.orgCd}>
            {sigungu.orgdownNm}
          </option>
        );
      })}
    </select>
  );
};
