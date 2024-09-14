import { useKind, useShelter, useSido, useSigungu } from 'front/hooks';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';
import React, { useEffect } from 'react';
import { DevTool } from '@hookform/devtools';
import {
  UseFormHandleSubmit,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  children?: React.ReactNode;
  handleSubmit: UseFormHandleSubmit<T>;
  submitHandler: SubmitHandler<T>;
}

const Form = <T extends FieldValues>({
  children,
  handleSubmit,
  submitHandler,
}: Props<T>) => {
  return <form onSubmit={handleSubmit(submitHandler)}>{children}</form>;
};

export const SearchForm = () => {
  const initSido = {
    orgCd: '',
    orgdownNm: '모두',
  };
  const initSigungu = {
    uprCd: '',
    orgCd: '',
    orgdownNm: '모두',
  };
  const initShelter = {
    careNm: '모두',
    careRegNo: '',
  };
  const initKind = {
    knm: '모두',
    kindCd: '',
  };
  const Upkinds = [
    { upKindNm: '모두', upkind: '' },
    { upKindNm: '개', upkind: '417000' },
    { upKindNm: '고양이', upkind: '422400' },
    { upKindNm: '기타', upkind: '429900' },
  ];

  const { register, handleSubmit, watch, control } =
    useForm<AnimalInfoRequestType>({
      defaultValues: {
        upr_cd: initSido.orgCd,
        org_cd: initSigungu.orgCd,
        care_reg_no: initShelter.careRegNo,
        upkind: Upkinds[0].upkind,
        kind: initKind.kindCd,
      },
    });
  //init
  const sidos = useSido({
    init: initSido,
  });
  const sigungus = useSigungu({
    upr_cd: watch('upr_cd'),
    init: initSigungu,
  });
  const shelters = useShelter({
    init: initShelter,
    upr_cd: watch('upr_cd'),
    org_cd: watch('org_cd'),
  });
  const kind = useKind({
    init: initKind,
    up_kind_cd: watch('upkind'),
  });

  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        submitHandler={(data) => {
          console.log(data);
        }}
      >
        <select {...register('upr_cd')}>
          {sidos.data?.map((sido) => {
            return (
              <option key={sido.orgCd} value={sido.orgCd}>
                {sido.orgdownNm}
              </option>
            );
          })}
        </select>
        <select {...register('org_cd')}>
          {sigungus.data?.map((sigungu, index) => {
            return (
              <option key={index} value={sigungu.orgCd}>
                {sigungu.orgdownNm}
              </option>
            );
          })}
        </select>
        <select {...register('care_reg_no')}>
          {shelters.data?.map((shelter, index) => {
            return (
              <option key={index} value={shelter.careRegNo}>
                {shelter.careNm}
              </option>
            );
          })}
        </select>
        <select {...register('upkind')}>
          {Upkinds.map((upkind, index) => {
            return (
              <option key={index} value={upkind.upkind}>
                {upkind.upKindNm}
              </option>
            );
          })}
        </select>
        <select {...register('kind')}>
          {kind.data?.map((kind, index) => {
            return (
              <option key={index} value={kind.kindCd}>
                {kind.knm}
              </option>
            );
          })}
        </select>
        <button type="submit" className="btn">
          dd
        </button>
      </Form>
      <DevTool control={control} />
    </>
  );
};
