import { AnimalInfoRequestType } from '@animal-project/shared-types';
import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { cn } from 'front/lib/utils';

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
    <label className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-muted-foreground">{labelName}</span>
      <select
        className={cn(
          'h-8 rounded-lg border border-input bg-background px-2 text-xs text-foreground',
          'transition-colors hover:border-primary/40',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
        )}
        {...register(name)}
      >
        {children}
      </select>
    </label>
  );
};
