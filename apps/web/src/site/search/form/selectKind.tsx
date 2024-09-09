import React from 'react';

import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { useQueryKind } from '../../function/query';

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import CircularProgress from '@mui/joy/CircularProgress';

const SelectKind = () => {
  const { control } = useFormContext();

  const upkindData = useWatch({
    control,
    name: 'upkind',
  });

  const { data, queryInfo } = useQueryKind(upkindData);

  return (
    <Controller
      name="kind"
      defaultValue={'-1'}
      control={control}
      render={({ field: { onChange, ...props } }) => {
        return (
          <Select
            startDecorator={
              queryInfo.isFetching ? <CircularProgress size="sm" /> : null
            }
            onChange={(e, v) => {
              onChange(v);
            }}
            {...props}
          >
            {upkindData != '-1' ? <Option value="-1">{'전체'}</Option> : null}
            {data?.response.body.items.item?.map((kind, idx) => {
              return (
                <Option key={idx} value={kind.kindCd}>
                  {kind.knm}
                </Option>
              );
            })}
          </Select>
        );
      }}
    />
  );
};

export default SelectKind;
