'use client';

import React from 'react';
import { MdOutlinePets, MdOutlineContentPasteSearch } from 'react-icons/md';
import { FcLikePlaceholder } from 'react-icons/fc';
import { usePathname, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { cn } from 'front/lib/utils';

export const Bottom = () => {
  const pathname = usePathname();
  const router = useRouter();
  const barItem = [
    { name: '홈', path: '/', icon: <MdOutlinePets /> },
    { name: '조회하기', path: '/search', icon: <MdOutlineContentPasteSearch /> },
    { name: '좋아요', path: '/like', icon: <FcLikePlaceholder /> },
  ];
  return (
    <nav
      aria-label="하단 내비게이션"
      className="fixed inset-x-0 bottom-0 z-50 flex h-12 border-t border-border bg-background"
    >
      {barItem.map((bar) => {
        const active = pathname === bar.path;
        return (
          <button
            key={uuidv4()}
            type="button"
            onClick={() => router.push(bar.path)}
            className={cn(
              'flex flex-1 items-center justify-center text-base transition-colors',
              active
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-label={bar.name}
          >
            {bar.icon}
          </button>
        );
      })}
    </nav>
  );
};
