import { useKind, useSido } from 'front/hooks';
import React from 'react';
import { initKind, initSido } from './initData';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { AnimalInfoRequestType } from '@animal-project/shared-types';
import { Select, SelectProps, SelectWatchProps } from './Select';

export const KindSelect = (props: SelectProps & SelectWatchProps) => {
  const { register, watch, name } = props;
  const kind = useKind({
    init: initKind,
    up_kind_cd: watch('upkind') ?? '',
  });
  return (
    <Select labelName="종류" register={register} name={name}>
      {kind.data?.map((kind, index) => {
        return (
          <option key={index} value={kind.kindCd}>
            {kind.knm}
          </option>
        );
      })}
    </Select>
  );
};
