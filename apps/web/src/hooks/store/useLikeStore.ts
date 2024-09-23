import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AnimalInfo } from 'front/new-types/responseAPI';
import { useEffect, useState } from 'react';

type AnimalLikeType = AnimalInfo & {like: boolean};

type LikeStore = {
  likes: AnimalLikeType[];
  addLike: (likeItem: AnimalLikeType) => void;
  removeLike: (likeItem: AnimalLikeType) => void;
};

export const useLikeStore = create(
  persist<LikeStore>(
    (set) => ({
      likes: [],
      addLike: (likeItem) => set((state) => ({ likes: [...state.likes, likeItem] })),
      removeLike: (likeItem) => set((state) => ({ likes: state.likes.filter((like) => like.desertionNo !== likeItem.desertionNo) })),
    }),
    {
      name: 'like-storage', // 로컬 스토리지에 저장될 키 이름
    }
  )
);

type UseLikeType = {
    likeItem : AnimalLikeType
}

export const useLike = (props: UseLikeType) => {
    const {likeItem} = props
    const [like, setLike] = useState(false);
    const { likes, addLike, removeLike } = useLikeStore(); // useLikeStore 훅을 사용하여 likes 배열 가져오기

    // 로컬 스토리지에서 데이터를 가져와서 상태를 설정하는 로직 추가
    useEffect(() => {
        const isLiked = likes.some((item) => item.desertionNo === likeItem.desertionNo);
        setLike(isLiked);
    }, [likes, likeItem.desertionNo]);

    // 좋아요 추가/제거 함수
    const toggleLike = () => {
        if (like) {
            removeLike(likeItem);
        } else {
            addLike({ ...likeItem, like: true });
        }
        setLike(!like);
    };

    return { like, toggleLike };
}