import { useKind, useShelter, useSido, useSigungu } from 'front/hooks';
import { AnimalInfoRequestType } from 'front/new-types/requestAPI';
import React, { useEffect } from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
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

export const SearchForm = () => {
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
      <Form
        handleSubmit={handleSubmit}
        submitHandler={(data) => {
          console.log(data);
        }}
      >
        <div className="grid grid-flow-col">
          <div className="col-span-full">
            <SidoSelect register={register} />
            <SigunguSelect register={register} watch={watch} />
            <ShelterSelect register={register} watch={watch} />
          </div>
          <div className="col-span-full">
            <UpkindSelect register={register} />
            <KindSelect register={register} watch={watch} />
          </div>
        </div>

        <button type="submit" className="btn">
          dd
        </button>
      </Form>
      <DevTool control={control} />
    </>
  );
};
