import { AnimalInfoRequestType } from 'front/new-types/requestAPI';
import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

type Props = {
  children: React.ReactNode;
  labelName: string;
};

export type SelectProps = {
  register: UseFormRegister<AnimalInfoRequestType>;
  name: keyof AnimalInfoRequestType;
};

export type SelectWatchProps = {
  watch: UseFormWatch<AnimalInfoRequestType>;
};

export const Select = (props: Props & SelectProps) => {
  const { children, labelName, register, name } = props;
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text text-xs">{labelName}</span>
      </div>
      <select className="select select-bordered select-xs " {...register(name)}>
        {children}
      </select>
    </label>
  );
};
