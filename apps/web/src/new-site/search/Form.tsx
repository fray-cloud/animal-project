import { AnimalInfoRequestType } from 'front/new-types/requestAPI';
import React from 'react';
import { DevTool } from '@hookform/devtools';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'front/new-component';
import {
  initKind,
  initShelter,
  initSido,
  initSigungu,
  Upkinds,
} from './select/initData';
import { SidoSelect } from './select/SidoSelect';
import { SigunguSelect } from './select/SigunguSelect';
import { ShelterSelect } from './select/ShelterSelect';
import { UpkindSelect } from './select/UpkindSelect';
import { KindSelect } from './select/KindSelect';

export const SearchForm = (props: {
  submitHandler: SubmitHandler<AnimalInfoRequestType>;
}) => {
  const { submitHandler } = props;
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
  return (
    <>
      <Form handleSubmit={handleSubmit} submitHandler={submitHandler}>
        <div className="border border-teal-700 grid grid-cols-3 gap-1 hover:border-teal-50 duration-300">
          {/* 첫 번째 줄 */}
          <div className="col-span-1">
            <SidoSelect register={register} name="upr_cd" />
          </div>
          <div className="col-span-1">
            <SigunguSelect register={register} watch={watch} name="org_cd" />
          </div>
          <div className="col-span-1">
            <ShelterSelect
              register={register}
              watch={watch}
              name="care_reg_no"
            />
          </div>
          <div />
        </div>
        <div className="h-2"></div>
        <div className="border border-teal-700 grid grid-cols-3 gap-1 hover:border-teal-50 duration-300">
          {/* 두 번째 줄 */}
          <div className="col-span-1">
            <UpkindSelect register={register} name="upkind" />
          </div>
          <div className="col-span-1">
            <KindSelect register={register} watch={watch} name="kind" />
          </div>
          <div className="col-span-1"></div> {/* 필요 시 빈 공간으로 유지 */}
        </div>
        <div className="flex justify-end mt-4">
          <button type="submit" className="btn btn-sm">
            Submit
          </button>
        </div>
      </Form>
      <DevTool control={control} />
    </>
  );
};
