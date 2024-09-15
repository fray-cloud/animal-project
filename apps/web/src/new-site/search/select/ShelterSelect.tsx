import { useShelter, useSido } from 'front/hooks';
import React from 'react';
import { initShelter, initSido } from './initData';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';

type Props = {
  register: UseFormRegister<AnimalInfoRequestType>;
  watch: UseFormWatch<AnimalInfoRequestType>;
};

export const ShelterSelect = (props: Props) => {
  const { register, watch } = props;
  const shelters = useShelter({
    init: initShelter,
    upr_cd: watch('upr_cd'),
    org_cd: watch('org_cd'),
  });
  return (
    <select {...register('care_reg_no')}>
      {shelters.data?.map((shelter, index) => {
        return (
          <option key={index} value={shelter.careRegNo}>
            {shelter.careNm}
          </option>
        );
      })}
    </select>
  );
};
