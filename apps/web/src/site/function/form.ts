import { useForm, FieldValues } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';

export interface AbandonmentPublicProp extends FieldValues {
  bgnde?: Dayjs | string; // 유기날짜 시작일
  endde?: Dayjs | string; // 유기날짜 종료일
  upkind?: string; // 축종코드
  kind?: string; // 품종코드
  upr_cd?: string; // 시도코드
  org_cd?: string; // 시군구코드
  care_reg_no?: string; // 보호소번호
  state?: string; // 상태
  neuter_yn?: string; // 중성화여부
  pageNo?: string; // 페이지 번호
  numOfRows?: string; // 페이지당 보여줄 갯수
}

export interface AbandonmentPublicForm extends FieldValues {
  bgnde?: Dayjs; // 유기날짜 시작일
  endde?: Dayjs; // 유기날짜 종료일
  upkind?: string; // 축종코드
  kind?: string; // 품종코드
  upr_cd?: string; // 시도코드
  org_cd?: string; // 시군구코드
  care_reg_no?: string; // 보호소번호
  state?: string; // 상태
  neuter_yn?: string; // 중성화여부
  pageNo?: string; // 페이지 번호
  numOfRows?: string; // 페이지당 보여줄 갯수
}

export const useFormAbandonment = () => {
  const methods = useForm<AbandonmentPublicProp>({
    defaultValues: {
      bgnde: dayjs().add(-7, 'days'),
      endde: dayjs(),
    },
  });
  return methods;
};
