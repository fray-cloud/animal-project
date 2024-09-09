import React from 'react';
import {
  FormControl,
  FormLabel,
  Autocomplete,
  FormHelperText,
  AutocompleteOption,
} from '@mui/joy';
import { useFormContext, Controller } from 'react-hook-form';
import { useQuerySido } from '../../function/query';

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import CircularProgress from '@mui/joy/CircularProgress';

const SelectSido = () => {
  const { control } = useFormContext();
  const { data, queryInfo } = useQuerySido();

  return (
    <Controller
      name="upr_cd"
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
            <Option value="-1">{'전체'}</Option>
            {data?.response.body.items.item?.map((sido, idx) => {
              return (
                <Option key={idx} value={sido.orgCd}>
                  {sido.orgdownNm}
                </Option>
              );
            })}
          </Select>
        );
      }}
    />
  );
};

export default SelectSido;
