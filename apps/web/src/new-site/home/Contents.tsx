import React from 'react';
import './contents.scss';
import { useNavigate } from 'react-router-dom';

type Props = {};

const SearchContentsItem = () => {
  const navigate = useNavigate();
  return (
    <div className="contents-font">
      <div className="flex flex-col text-center">
        <div className="col-span-1 flex flex-col gap-3">
          <h1 className="text-4xl font-bold">
            당신이 반려자가 될 수 있습니다.
          </h1>
          <p className="text-sm text-red-300">
            여기 돌봄이 필요한 동물들이 있습니다.
          </p>
          <p className="text-sm text-red-300">
            당신의 책임있는 사랑이 그들의 삶을 바꿀 수 있습니다.
          </p>
        </div>
        <button
          className="btn btn-link btn-primary"
          onClick={() => navigate('/search')}
        >
          조회하기
        </button>
      </div>
    </div>
  );
};

export const Contents = (props: Props) => {
  return (
    <div className="container w-full m-auto overflow-y-hidden">
      <div className="flex flex-col gap-10 ">
        <SearchContentsItem />
      </div>
    </div>
  );
};
