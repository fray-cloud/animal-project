'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { Sido } from '@animal-project/shared-types';
import { useAnimalInfoSidoCount } from 'front/hooks';
import { Skeleton } from 'front/components/ui/skeleton';

// ── CountUp: 0에서 실제 숫자까지 카운팅 ──────────────────────
const CountUp = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obj = { v: 0 };
    anime({
      targets: obj,
      v: value,
      round: 1,
      duration: 1400,
      easing: 'easeOutExpo',
      update() {
        if (ref.current) {
          ref.current.textContent = obj.v.toLocaleString();
        }
      },
    });
  }, [value]);

  return <span ref={ref}>0</span>;
};

// ── SplitText: 텍스트를 글자 단위 span으로 분리 ──────────────
const SplitText = ({ text }: { text: string }) => (
  <>
    {text.split('').map((char, i) => (
      <span
        key={i}
        data-char=""
        style={{ display: 'inline-block', overflow: 'hidden', lineHeight: '1.2' }}
      >
        <span style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      </span>
    ))}
  </>
);

// ── AnimatedCityCarousel ──────────────────────────────────────
type Props = { items: Sido[] };

export const AnimatedCityCarousel = ({ items }: Props) => {
  const counts = useAnimalInfoSidoCount(items);
  const loaded = counts
    .filter((r) => r.isSuccess && r.data?.sido.orgCd !== '')
    .map((r) => r.data!);

  const [index, setIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const didInit = useRef(false);

  // 현재 wrap 안의 글자 span 배열 반환
  const getChars = () =>
    wrapRef.current
      ? Array.from(
          wrapRef.current.querySelectorAll<HTMLElement>('[data-char] > span')
        )
      : [];

  // B item 입장: 아래에서 위로
  const animateIn = useCallback(() => {
    const chars = getChars();
    if (!chars.length) return;
    anime.set(chars, { translateY: 18, opacity: 0 });
    anime({
      targets: chars,
      translateY: [18, 0],
      opacity: [0, 1],
      delay: anime.stagger(45),
      duration: 420,
      easing: 'easeOutCubic',
    });
  }, []);

  // A item 퇴장: 위로 올라가며 사라짐
  const animateOut = useCallback(
    () =>
      new Promise<void>((resolve) => {
        const chars = getChars();
        if (!chars.length) return resolve();
        anime({
          targets: chars,
          translateY: [0, -18],
          opacity: [1, 0],
          delay: anime.stagger(28, { from: 'last' }),
          duration: 280,
          easing: 'easeInCubic',
          complete: () => resolve(),
        });
      }),
    []
  );

  // 다음 아이템으로 전환
  const advance = useCallback(async () => {
    if (!loaded.length || isTransitioning.current) return;
    isTransitioning.current = true;
    await animateOut();
    setIndex((prev) => (prev + 1) % loaded.length);
    isTransitioning.current = false;
  }, [loaded.length, animateOut]);

  // 첫 데이터 로드 시 입장 애니메이션
  useEffect(() => {
    if (!loaded.length) return;
    const t = setTimeout(() => animateIn(), 80);
    return () => clearTimeout(t);
    // loaded.length > 0 첫 진입 시 1회만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded.length > 0 ? 1 : 0]);

  // index 변경 후 새 글자 입장
  useEffect(() => {
    if (!loaded.length) return;
    if (!didInit.current) {
      didInit.current = true;
      return;
    }
    requestAnimationFrame(() => animateIn());
  }, [index, animateIn, loaded.length]);

  // 자동 전환 타이머 (3.5초)
  useEffect(() => {
    if (!loaded.length) return;
    const timer = setInterval(advance, 3500);
    return () => clearInterval(timer);
  }, [loaded.length, advance]);

  // ── 로딩 상태 ──────────────────────────────────────────────
  if (!loaded.length) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="h-7 w-7 shrink-0 rounded bg-primary-foreground/20" />
        <div className="space-y-1">
          <Skeleton className="h-3.5 w-20 bg-primary-foreground/20" />
          <Skeleton className="h-3 w-12 bg-primary-foreground/20" />
        </div>
      </div>
    );
  }

  const item = loaded[index % loaded.length];

  return (
    <div className="flex min-w-0 items-center gap-3 overflow-hidden">
      <div className="h-7 w-7 shrink-0 overflow-hidden rounded">
        <img
          src={`/logo/${item.sido.orgCd}.png`}
          alt={item.sido.orgdownNm}
          className="h-full w-full object-contain"
        />
      </div>
      <div ref={wrapRef} className="min-w-0">
        {/* 시도명: 글자 스플리팅 */}
        <div className="text-sm font-bold leading-snug">
          <SplitText text={item.sido.orgdownNm} />
        </div>
        {/* 숫자: 0에서 카운팅 */}
        <div className="text-xs opacity-60">
          <CountUp value={item.totalCount} />
          <span> 마리</span>
        </div>
      </div>
    </div>
  );
};
