import { AnimalInfo } from '@animal-project/shared-types';
import { act, renderHook } from '@testing-library/react';
import { useLikeStore, useLike } from './useLikeStore';

const makeAnimal = (id: string): AnimalInfo =>
  ({ desertionNo: id } as AnimalInfo);

describe('useLikeStore', () => {
  beforeEach(() => {
    // Reset store state between tests
    useLikeStore.setState({ likes: [] });
  });

  it('starts with an empty likes array', () => {
    const { result } = renderHook(() => useLikeStore());
    expect(result.current.likes).toEqual([]);
  });

  it('addLike appends an animal to the likes list', () => {
    const { result } = renderHook(() => useLikeStore());
    act(() => {
      result.current.addLike({ ...makeAnimal('1'), like: true });
    });
    expect(result.current.likes).toHaveLength(1);
    expect(result.current.likes[0].desertionNo).toBe('1');
  });

  it('removeLike removes the matching animal by desertionNo', () => {
    useLikeStore.setState({
      likes: [
        { ...makeAnimal('1'), like: true },
        { ...makeAnimal('2'), like: true },
      ],
    });
    const { result } = renderHook(() => useLikeStore());
    act(() => {
      result.current.removeLike({ ...makeAnimal('1'), like: true });
    });
    expect(result.current.likes).toHaveLength(1);
    expect(result.current.likes[0].desertionNo).toBe('2');
  });

  it('addLike does not duplicate if called twice for different items', () => {
    const { result } = renderHook(() => useLikeStore());
    act(() => {
      result.current.addLike({ ...makeAnimal('A'), like: true });
      result.current.addLike({ ...makeAnimal('B'), like: true });
    });
    expect(result.current.likes).toHaveLength(2);
  });
});

describe('useLike hook', () => {
  beforeEach(() => {
    useLikeStore.setState({ likes: [] });
  });

  it('starts with like = false when the item is not in the store', () => {
    const { result } = renderHook(() =>
      useLike({ likeItem: { ...makeAnimal('X'), like: false } })
    );
    expect(result.current.like).toBe(false);
  });

  it('toggleLike sets like to true and adds the item to the store', () => {
    const { result } = renderHook(() =>
      useLike({ likeItem: { ...makeAnimal('X'), like: false } })
    );
    act(() => {
      result.current.toggleLike();
    });
    expect(result.current.like).toBe(true);
    expect(useLikeStore.getState().likes).toHaveLength(1);
  });

  it('calling toggleLike twice removes the item from the store', () => {
    const { result } = renderHook(() =>
      useLike({ likeItem: { ...makeAnimal('X'), like: false } })
    );
    act(() => {
      result.current.toggleLike();
    });
    act(() => {
      result.current.toggleLike();
    });
    expect(result.current.like).toBe(false);
    expect(useLikeStore.getState().likes).toHaveLength(0);
  });

  it('starts with like = true when the item is already in the store', () => {
    useLikeStore.setState({
      likes: [{ ...makeAnimal('Y'), like: true }],
    });
    const { result } = renderHook(() =>
      useLike({ likeItem: { ...makeAnimal('Y'), like: false } })
    );
    expect(result.current.like).toBe(true);
  });
});
