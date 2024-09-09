import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

import { Controller, useFormContext } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { useQueryEndDate, useQueryStartDate } from '../../function/query';

interface props {
  isRange?: boolean;
}

const DatePicker = ({ isRange = true }: props) => {
  const { control, setValue, getValues } = useFormContext();
  const { update: startUpdate, initialData: startInitData } = useQueryStartDate(
    getValues('bgnde')
  );
  const { update: endUpdate, initialData: endInitData } = useQueryEndDate(
    getValues('endde')
  );

  const StartDate = () => {
    const handleChange = (dateChange: Dayjs | null) => {
      if (dateChange && dateChange > (getValues('endde') as Dayjs)) {
        alert(
          '[시작 날짜]가 [종료 날짜] 보다 앞설 수 없습니다. 초기화 합니다.'
        );
        setValue('bgnde', startInitData);
        setValue('endde', endInitData);
        startUpdate(startInitData);
        endUpdate(endInitData);
      } else {
        setValue('bgnde', dateChange);
        startUpdate(dateChange);
      }
    };

    return (
      <Controller
        name="bgnde"
        control={control}
        defaultValue={startInitData}
        render={({ field: { value } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDatePicker
              slotProps={{ textField: { size: 'small' } }}
              label="시작일"
              format="YYYY/MM/DD"
              value={value}
              onChange={(data) => {
                handleChange(data);
              }}
            />
          </LocalizationProvider>
        )}
      />
    );
  };

  const EndDate = () => {
    const handleChange = (dateChange: Dayjs | null) => {
      if (
        dateChange &&
        (dateChange < (getValues('bgnde') as Dayjs) || dateChange > dayjs())
      ) {
        if (dateChange < (getValues('bgnde') as Dayjs)) {
          alert(
            '[종료 날짜]가 [시작 날짜] 보다 뒤쳐질 수 없습니다. 초기화 합니다.'
          );
        } else if (dateChange > dayjs()) {
          alert(
            '[종료 날짜]가 [오늘 날짜] 보다 앞설 수 없습니다. 초기화 합니다.'
          );
        }

        setValue('bgnde', startInitData);
        setValue('endde', endInitData);
        startUpdate(startInitData);
        endUpdate(endInitData);
      } else {
        setValue('endde', dateChange);
        endUpdate(dateChange);
      }
    };

    return (
      <Controller
        name="endde"
        control={control}
        defaultValue={endInitData}
        render={({ field: { value } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDatePicker
              slotProps={{ textField: { size: 'small' } }}
              sx={{ marginTop: '10px' }}
              label="종료일"
              format="YYYY/MM/DD"
              value={value}
              onChange={(data) => {
                handleChange(data);
              }}
            />
          </LocalizationProvider>
        )}
      />
    );
  };

  return (
    <>
      <StartDate />
      {isRange ? <EndDate /> : null}
    </>
  );
};

export default DatePicker;
