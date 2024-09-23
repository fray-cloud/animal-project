import { AnimalInfo } from 'front/new-types/responseAPI';
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLike } from 'front/hooks/store';

type Props = {
  item: AnimalInfo;
};

export const AnimalCard = (props: Props) => {
  const { item } = props;
  const { like, toggleLike } = useLike({ likeItem: { ...item, like: false } });

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="absolute top-3 right-3">
        <motion.div whileTap={{ scale: 1.3 }} onClick={() => toggleLike()}>
          <FaHeart className={`${like ? 'text-red-500' : ''}`} />
        </motion.div>
      </div>
      <figure className="px-10 pt-10">
        <img src={item.popfile} alt="pet" className="rounded-xl h-32" />
      </figure>
      <div className="card-body items-center text-center">
        <table className="table table-sm">
          <thead></thead>
          <tbody>
            <tr className="hover">
              <th>종류</th>
              <td>{item.kindCd}</td>
            </tr>
            <tr className="hover">
              <th>성별</th>
              <td>{item.sexCd}</td>
            </tr>
            <tr className="hover">
              <th>나이</th>
              <td>{item.age}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
