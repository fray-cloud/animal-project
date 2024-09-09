import React from 'react';

import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { useQuerySigungu } from '../../function/query';

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import CircularProgress from '@mui/joy/CircularProgress';

const SelectSigungu = () => {
  const { control } = useFormContext();

  const sidoData = useWatch({
    control,
    name: 'upr_cd',
  });

  const { data, queryInfo } = useQuerySigungu(sidoData);

  return (
    <Controller
      name="org_cd"
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
            {sidoData != '-1' ? <Option value="-1">{'전체'}</Option> : null}
            {data?.response.body.items.item?.map((sigungu, idx) => {
              return (
                <Option key={idx} value={sigungu.orgCd}>
                  {sigungu.orgdownNm}
                </Option>
              );
            })}
          </Select>
        );
      }}
    />
  );
};

export default SelectSigungu;
