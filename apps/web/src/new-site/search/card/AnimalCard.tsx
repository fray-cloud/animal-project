'use client';

import { AnimalInfo } from '@animal-project/shared-types';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLike } from 'front/hooks/store';
import { Card, CardContent } from 'front/new-component/ui/card';

type Props = {
  item: AnimalInfo;
};

export const AnimalCard = (props: Props) => {
  const { item } = props;
  const { like, toggleLike } = useLike({ likeItem: { ...item, like: false } });

  return (
    <Card className="relative shadow-xl">
      <div className="absolute top-3 right-3">
        <motion.div whileTap={{ scale: 1.3 }} onClick={() => toggleLike()}>
          <FaHeart className={like ? 'text-red-500' : ''} />
        </motion.div>
      </div>
      <figure className="px-10 pt-10">
        <img src={item.popfile} alt="pet" className="rounded-xl h-32" />
      </figure>
      <CardContent className="flex flex-col items-center text-center">
        <table className="text-sm">
          <tbody>
            <tr>
              <th className="px-2 py-1 font-medium">종류</th>
              <td className="px-2 py-1">{item.kindCd}</td>
            </tr>
            <tr>
              <th className="px-2 py-1 font-medium">성별</th>
              <td className="px-2 py-1">{item.sexCd}</td>
            </tr>
            <tr>
              <th className="px-2 py-1 font-medium">나이</th>
              <td className="px-2 py-1">{item.age}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
