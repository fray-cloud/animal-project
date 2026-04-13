import React from 'react';
import { LikeView } from './LikeView';

const LikePage = () => {
  return (
    <div className="min-h-[60vh]">
      <h1 className="mb-4 text-lg font-bold text-primary">북마크한 동물</h1>
      <LikeView />
    </div>
  );
};

export default LikePage;
