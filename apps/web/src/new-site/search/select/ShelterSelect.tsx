import { useShelter, useSido } from 'front/hooks';
import React from 'react';
import { initShelter, initSido } from './initData';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';
import { Select, SelectProps, SelectWatchProps } from './Select';

export const ShelterSelect = (props: SelectProps & SelectWatchProps) => {
  const { register, watch, name } = props;
  const shelters = useShelter({
    init: initShelter,
    upr_cd: watch('upr_cd'),
    org_cd: watch('org_cd'),
  });
  return (
    <Select labelName="보호소" register={register} name={name}>
      {shelters.data?.map((shelter, index) => {
        return (
          <option key={index} value={shelter.careRegNo}>
            {shelter.careNm}
          </option>
        );
      })}
    </Select>
  );
};
