import { useKind, useSido } from 'front/hooks';
import React from 'react';
import { initKind, initSido } from './initData';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';

type Props = {
  register: UseFormRegister<AnimalInfoRequestType>;
  watch: UseFormWatch<AnimalInfoRequestType>;
};

export const KindSelect = (props: Props) => {
  const { register, watch } = props;
  const kind = useKind({
    init: initKind,
    up_kind_cd: watch('upkind'),
  });
  return (
    <select {...register('kind')}>
      {kind.data?.map((kind, index) => {
        return (
          <option key={index} value={kind.kindCd}>
            {kind.knm}
          </option>
        );
      })}
    </select>
  );
};
