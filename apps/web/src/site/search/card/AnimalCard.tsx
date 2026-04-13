'use client';

import { AnimalInfo } from '@animal-project/shared-types';
import React, { useState } from 'react';
import { FaBookmark, FaRegBookmark, FaRegImage } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLike } from 'front/hooks/store';
import { cn } from 'front/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from 'front/components/ui/drawer';
import { Badge } from 'front/components/ui/badge';
import { Button } from 'front/components/ui/button';

type Props = {
  item: AnimalInfo;
};

const SafeImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-muted/20 p-3">
        <FaRegImage className="text-2xl text-muted-foreground/35" />
        <p className="text-center text-[9px] leading-tight text-muted-foreground/50">
          이미지를 불러올 수 없습니다
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

const formatDate = (d: string) =>
  d?.length === 8 ? `${d.slice(0, 4)}.${d.slice(4, 6)}.${d.slice(6)}` : d;

const InfoRow = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value?: string;
  highlight?: boolean;
}) => {
  if (!value) return null;
  return (
    <div className="flex gap-3 text-sm">
      <span className="w-20 shrink-0 text-muted-foreground">{label}</span>
      <span className={cn('flex-1 font-medium', highlight && 'text-accent')}>
        {value}
      </span>
    </div>
  );
};

export const AnimalCard = ({ item }: Props) => {
  const { like, toggleLike } = useLike({ likeItem: { ...item, like: false } });
  const [open, setOpen] = useState(false);

  const sexLabel =
    item.sexCd === 'M' ? '수컷' : item.sexCd === 'F' ? '암컷' : '미상';
  const neuterLabel =
    item.neuterYn === 'Y'
      ? '중성화 완료'
      : item.neuterYn === 'N'
        ? '미중성화'
        : '미상';
  // v2 API: kindNm = "믹스견", upKindNm = "개"
  const breedName = item.kindNm || item.kindCd || '알 수 없음';
  const kindShort = breedName.slice(0, 14);

  const images = [
    item.popfile1,
    item.popfile2,
    item.popfile3,
    item.popfile4,
    item.popfile5,
    item.popfile6,
    item.popfile7,
    item.popfile8,
  ].filter(Boolean) as string[];

  return (
    <>
      {/* Card */}
      <div
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
      >
        {/* Like */}
        <button
          type="button"
          aria-label={like ? '북마크 취소' : '북마크'}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
        >
          <motion.div whileTap={{ scale: 1.4 }}>
            {like ? (
              <FaBookmark className="text-xs text-accent" />
            ) : (
              <FaRegBookmark className="text-xs text-muted-foreground/50" />
            )}
          </motion.div>
        </button>

        {/* Image — contain so no cropping */}
        <div className="relative aspect-square w-full overflow-hidden bg-muted/50">
          {item.popfile1 ? (
            <SafeImage
              src={item.popfile1}
              alt={kindShort}
              className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl text-muted-foreground/30">
              🐾
            </div>
          )}
          {item.processState && (
            <Badge
              variant="secondary"
              className="absolute bottom-1.5 left-1.5 text-[10px] px-2 py-0.5"
            >
              {item.processState}
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="p-2.5">
          <p className="mb-0.5 truncate text-[11px] text-muted-foreground">
            {item.upKindNm}
          </p>
          <p className="mb-1.5 truncate text-xs font-semibold text-foreground">
            {kindShort}
          </p>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-[10px] px-2 py-0">
              {sexLabel}
            </Badge>
            {item.age && (
              <Badge variant="outline" className="text-[10px] px-2 py-0">
                {item.age}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[90dvh] outline-none">
          <div className="flex h-full flex-col overflow-hidden">
            <DrawerHeader className="shrink-0 pb-2">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <DrawerTitle className="truncate text-left text-base font-bold text-primary">
                    {item.kindFullNm || breedName}
                  </DrawerTitle>
                  <DrawerDescription className="text-left text-xs">
                    유기번호 {item.desertionNo}
                  </DrawerDescription>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {item.processState && (
                    <Badge variant="secondary" className="text-xs">
                      {item.processState}
                    </Badge>
                  )}
                  <button
                    type="button"
                    aria-label={like ? '북마크 취소' : '북마크'}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-transform hover:scale-110 active:scale-95"
                    onClick={() => toggleLike()}
                  >
                    <motion.div whileTap={{ scale: 1.3 }}>
                      {like ? (
                        <FaBookmark className="text-sm text-accent" />
                      ) : (
                        <FaRegBookmark className="text-sm text-muted-foreground/50" />
                      )}
                    </motion.div>
                  </button>
                </div>
              </div>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto">
              {/* Image gallery */}
              {images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-3">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className={cn(
                        'shrink-0 overflow-hidden rounded-xl bg-muted/60',
                        images.length === 1
                          ? 'w-full aspect-[4/3]'
                          : 'w-44 aspect-square'
                      )}
                    >
                      <SafeImage
                        src={img}
                        alt={`${breedName} ${i + 1}`}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3 px-4 pb-8 pt-1">
                {/* Basic info */}
                <section className="rounded-xl bg-muted/40 p-4 space-y-2.5">
                  <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    기본 정보
                  </h3>
                  <InfoRow label="축종" value={item.upKindNm} />
                  <InfoRow label="품종" value={item.kindNm} />
                  <InfoRow label="성별" value={sexLabel} />
                  <InfoRow label="나이" value={item.age} />
                  <InfoRow label="체중" value={item.weight} />
                  <InfoRow label="색상" value={item.colorCd} />
                  <InfoRow label="중성화" value={neuterLabel} />
                  {item.specialMark && (
                    <InfoRow label="특징" value={item.specialMark} />
                  )}
                </section>

                {/* Discovery info */}
                <section className="rounded-xl bg-muted/40 p-4 space-y-2.5">
                  <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    발견 정보
                  </h3>
                  <InfoRow label="발견장소" value={item.happenPlace} />
                  <InfoRow label="접수일" value={formatDate(item.happenDt)} />
                  <InfoRow
                    label="공고기간"
                    value={
                      item.noticeSdt && item.noticeEdt
                        ? `${formatDate(item.noticeSdt)} ~ ${formatDate(item.noticeEdt)}`
                        : undefined
                    }
                  />
                  {item.noticeComment && (
                    <InfoRow label="특이사항" value={item.noticeComment} />
                  )}
                </section>

                {/* Shelter info */}
                <section className="rounded-xl bg-secondary/30 p-4 space-y-2.5">
                  <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-secondary-foreground/60">
                    보호소 정보
                  </h3>
                  <InfoRow label="보호소" value={item.careNm} />
                  <InfoRow label="주소" value={item.careAddr} />
                  <InfoRow label="전화" value={item.careTel} highlight />
                  <InfoRow label="관할기관" value={item.orgNm} />
                  {item.careOwnerNm && (
                    <InfoRow label="담당자" value={item.careOwnerNm} />
                  )}
                </section>

                {/* CTA */}
                {item.careTel && (
                  <Button
                    className="w-full h-12 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 text-base font-bold shadow-md shadow-accent/20"
                    asChild
                  >
                    <a href={`tel:${item.careTel}`}>📞 보호소에 전화하기</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
