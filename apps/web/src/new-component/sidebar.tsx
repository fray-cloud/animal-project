import React, { useState } from 'react';
import { MdOutlinePets, MdOutlineContentPasteSearch } from 'react-icons/md';
import { FcLikePlaceholder } from 'react-icons/fc';

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({
  isOpen,
  toggleSidebar,
}) => {
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
  return (
    <div
      className={`transition-all duration-75 ease-in-out bg-base-200 text-white ${
        isOpen ? 'w-40' : 'w-16'
      } h-full`}
    >
      <div className="p-4 flex justify-between">
        <button className="btn btn-square btn-sm" onClick={toggleSidebar}>
          {isOpen ? '←' : '→'}
        </button>
      </div>
      <ul className={`menu p-4 overflow-y-auto`}>
        {barItem.map((item) => {
          return (
            <li>
              <a
                className="flex items-center p-2 rounded hover:bg-base-700"
                href={item.path}
              >
                {item.icon}
                <span
                  className={`ml-3 transition-all duration-1000 ${
                    !isOpen ? 'hidden' : 'inline'
                  }`}
                >
                  {item.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
