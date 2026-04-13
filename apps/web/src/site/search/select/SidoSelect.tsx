import { useSido } from 'front/hooks';
import React from 'react';
import { initSido } from './initData';
import { Select, SelectProps } from './Select';

export const SidoSelect = (props: SelectProps) => {
  const { register, name } = props;
  const sidos = useSido({
    init: initSido,
  });
  return (
    <Select labelName="시도" register={register} name={name}>
      {sidos.data?.map((sido) => {
        return (
          <option key={sido.orgCd} value={sido.orgCd}>
            {sido.orgdownNm}
          </option>
        );
      })}
    </Select>
  );
};
