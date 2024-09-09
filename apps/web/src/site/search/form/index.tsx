import React from 'react';
import SelectSido from './selectSido';
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Box,
} from '@mui/joy';
import SelectSigungu from './selectSigungu';
import ToggleButtonUpkind from './toggleButtonUpkind';
import SelectKind from './selectKind';
import DatePicker from './datePicker';
import { useFormContext } from 'react-hook-form';
import { AbandonmentPublicForm } from '../../function/form';

const SearchForm = () => {
  const { handleSubmit, trigger } = useFormContext();

  const onSubmit = (formData: AbandonmentPublicForm) => {
    for (const k in formData) {
      formData[k] ? console.log(`${k} is good`) : console.log(`${k} is null`);
    }

    trigger();
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ marginRight: '5px', marginLeft: '5px' }}>
          <FormLabel>시도</FormLabel>
          <SelectSido />
          <FormHelperText>시도를 선택해 주세요.</FormHelperText>
        </FormControl>
        <FormControl sx={{ marginRight: '5px', marginLeft: '5px' }}>
          <FormLabel>시군구</FormLabel>
          <SelectSigungu />
          <FormHelperText>시군구를 선택해 주세요.</FormHelperText>
          <Divider sx={{ marginBottom: '10px' }} />
        </FormControl>
        <Box sx={{ marginRight: '5px', marginLeft: '5px' }}>
          <ToggleButtonUpkind />
        </Box>
        <FormControl sx={{ marginRight: '5px', marginLeft: '5px' }}>
          <FormLabel>종류</FormLabel>
          <SelectKind />
          <FormHelperText>종류를 선택해 주세요.</FormHelperText>
        </FormControl>
        <Divider sx={{ marginBottom: '10px' }} />
        <FormControl sx={{ marginRight: '5px', marginLeft: '5px' }}>
          <FormLabel>유기일</FormLabel>
          <DatePicker />
        </FormControl>
        <Box sx={{ marginRight: '5px', marginLeft: '5px' }}>
          <Button fullWidth type="submit" sx={{ marginTop: '5px' }}>
            조회
          </Button>
        </Box>
      </form>
    </Stack>
  );
};

export default SearchForm;
