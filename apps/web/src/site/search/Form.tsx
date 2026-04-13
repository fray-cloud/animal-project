'use client';

import { AnimalInfoRequestType } from '@animal-project/shared-types';
import React from 'react';
import { DevTool } from '@hookform/devtools';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { Form } from 'front/components';
import { Button } from 'front/components/ui/button';
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

const revealVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto', transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};

const defaultValues: AnimalInfoRequestType = {
  upr_cd: initSido.orgCd,
  org_cd: initSigungu.orgCd,
  care_reg_no: initShelter.careRegNo,
  upkind: Upkinds[0].upkind,
  kind: initKind.kindCd,
};

export const SearchForm = (props: {
  submitHandler: SubmitHandler<AnimalInfoRequestType>;
}) => {
  const { submitHandler } = props;
  const { register, handleSubmit, watch, control, reset } =
    useForm<AnimalInfoRequestType>({ defaultValues });

  const uprCd = watch('upr_cd');
  const orgCd = watch('org_cd');
  const upkind = watch('upkind');

  const showSigungu = !!uprCd;
  const showShelter = !!uprCd && !!orgCd;
  const showKind = !!upkind;

  return (
    <>
      <Form handleSubmit={handleSubmit} submitHandler={submitHandler}>
        <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
          {/* 장소 group */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              장소
            </p>
            <SidoSelect register={register} name="upr_cd" />
            <AnimatePresence initial={false}>
              {showSigungu && (
                <motion.div
                  key="sigungu"
                  variants={revealVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ overflow: 'hidden' }}
                >
                  <div className="pt-2">
                    <SigunguSelect register={register} watch={watch} name="org_cd" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {showShelter && (
                <motion.div
                  key="shelter"
                  variants={revealVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ overflow: 'hidden' }}
                >
                  <div className="pt-2">
                    <ShelterSelect register={register} watch={watch} name="care_reg_no" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="my-3 h-px bg-border/50" />

          {/* 동물종류 group */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              동물종류
            </p>
            <UpkindSelect register={register} name="upkind" />
            <AnimatePresence initial={false}>
              {showKind && (
                <motion.div
                  key="kind"
                  variants={revealVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ overflow: 'hidden' }}
                >
                  <div className="pt-2">
                    <KindSelect register={register} watch={watch} name="kind" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons */}
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 flex-1 rounded-lg text-xs text-muted-foreground"
              onClick={() => reset(defaultValues)}
            >
              초기화
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-9 flex-[2] rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 text-xs font-semibold"
            >
              검색
            </Button>
          </div>
        </div>
      </Form>
      <DevTool control={control} />
    </>
  );
};
