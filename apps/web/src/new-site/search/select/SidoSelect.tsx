import { useSido } from 'front/hooks';
import React from 'react';
import { initSido } from './initData';
import { UseFormRegister } from 'react-hook-form';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';

type Props = {
  register: UseFormRegister<AnimalInfoRequestType>;
};

export const SidoSelect = (props: Props) => {
  const { register } = props;
  const sidos = useSido({
    init: initSido,
  });
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">시도</span>
      </div>
      <select
        {...register('upr_cd')}
        className="select select-bordered select-xs"
      >
        {sidos.data?.map((sido) => {
          return (
            <option key={sido.orgCd} value={sido.orgCd}>
              {sido.orgdownNm}
            </option>
          );
        })}
      </select>
    </label>
  );
};
