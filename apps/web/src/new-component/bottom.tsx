import React from 'react';
import { MdOutlinePets, MdOutlineContentPasteSearch } from 'react-icons/md';
import { FcLikePlaceholder } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const Bottom = () => {
  const location = useLocation();
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
  const navigate = useNavigate();
  return (
    <div className="btm-nav btm-nav-xs">
      {barItem.map((bar) => {
        return (
          <button
            key={uuidv4()}
            className={location.pathname == bar.path ? 'active' : ''}
          >
            <a onClick={() => navigate(bar.path)}>{bar.icon}</a>
          </button>
        );
      })}
    </div>
  );
};
