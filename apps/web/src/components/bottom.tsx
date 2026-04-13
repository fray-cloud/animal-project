'use client';

import React from 'react';
import { MdOutlinePets, MdOutlineContentPasteSearch } from 'react-icons/md';
import { FaBookmark } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from 'front/lib/utils';

const barItems = [
  { name: '홈', path: '/', Icon: MdOutlinePets },
  { name: '조회', path: '/search', Icon: MdOutlineContentPasteSearch },
  { name: '북마크', path: '/like', Icon: FaBookmark },
];

export const Bottom = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      aria-label="하단 내비게이션"
      className="fixed inset-x-0 bottom-0 z-50 bg-background/80 backdrop-blur-xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Hairline separator */}
      <div className="h-px bg-border/40" />

      <div className="flex h-[49px] items-stretch">
        {barItems.map((bar) => {
          const active = pathname === bar.path;
          return (
            <button
              key={bar.path}
              type="button"
              onClick={() => router.push(bar.path)}
              aria-label={bar.name}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-[3px] transition-all duration-150 active:opacity-60',
              )}
            >
              <bar.Icon
                className={cn(
                  'transition-all duration-150',
                  active
                    ? 'text-[24px] text-accent'
                    : 'text-[22px] text-muted-foreground/60'
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-medium tracking-wide transition-colors duration-150',
                  active ? 'text-accent' : 'text-muted-foreground/60'
                )}
              >
                {bar.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
