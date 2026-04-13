'use client';

import React from 'react';
import { MdOutlinePets, MdOutlineContentPasteSearch } from 'react-icons/md';
import { FcLikePlaceholder } from 'react-icons/fc';
import { usePathname, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export const Bottom = () => {
  const pathname = usePathname();
  const barItem = [
    {
      name: '홈',
      path: '/',
      icon: <MdOutlinePets />,
    },
    {
      name: '조회하기',
      path: '/search',
      icon: <MdOutlineContentPasteSearch />,
    },
    {
      name: '좋아요',
      path: '/like',
      icon: <FcLikePlaceholder />,
    },
  ];
  const router = useRouter();
  return (
    <div className="btm-nav btm-nav-xs">
      {barItem.map((bar) => {
        return (
          <button
            key={uuidv4()}
            className={pathname === bar.path ? 'active' : ''}
          >
            <a onClick={() => router.push(bar.path)}>{bar.icon}</a>
          </button>
        );
      })}
    </div>
  );
};
