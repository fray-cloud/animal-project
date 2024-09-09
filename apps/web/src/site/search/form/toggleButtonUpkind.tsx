import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { useQueryUpKind } from '../../function/query';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ToggleButtonUpkind = () => {
  const { control, getValues, setValue } = useFormContext();
  const { data, queryInfo } = useQueryUpKind();

  return (
    <Controller
      name="upkind"
      defaultValue={'-1'}
      control={control}
      render={({ field: { onChange, ...props } }) => {
        return (
          <ToggleButtonGroup
            color="primary"
            exclusive
            fullWidth
            onChange={(e, v) => {
              // value 값이 null 값 일때가 toggle 모두 해제 될때인데 그럴 경우 "전체" 로 바뀌도록 변경함.
              getValues('kind') ? console.log('????') : setValue('kind', '-1');
              v ? onChange(v) : onChange('-1');
            }}
            {...props}
          >
            {data?.map((upkind, idx) => {
              return (
                <ToggleButton key={idx} value={upkind.up_kind_cd}>
                  {upkind.emoji}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        );
      }}
    />
  );
};

export default ToggleButtonUpkind;
