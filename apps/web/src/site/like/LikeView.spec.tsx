import { render, screen } from '@testing-library/react';
import { AnimalInfo } from '@animal-project/shared-types';
import { useLikeStore } from 'front/hooks/store';

// AnimalCard has framer-motion, Drawer (vaul) — stub it out
jest.mock('front/site/search/card', () => ({
  AnimalCard: ({ item }: { item: AnimalInfo }) => (
    <div data-testid="animal-card">{item.desertionNo}</div>
  ),
}));

// eslint-disable-next-line import/first
import { LikeView } from './LikeView';

const makeAnimal = (id: string): AnimalInfo & { like: boolean } =>
  ({ desertionNo: id, like: true } as AnimalInfo & { like: boolean });

describe('LikeView', () => {
  beforeEach(() => {
    useLikeStore.setState({ likes: [] });
  });

  it('shows the empty-state message when there are no bookmarks', () => {
    render(<LikeView />);
    expect(screen.getByText('북마크한 동물이 없습니다.')).toBeTruthy();
  });

  it('does not show animal cards in the empty state', () => {
    render(<LikeView />);
    expect(screen.queryByTestId('animal-card')).toBeNull();
  });

  it('renders a card for each liked animal', () => {
    useLikeStore.setState({
      likes: [makeAnimal('1'), makeAnimal('2'), makeAnimal('3')],
    });
    render(<LikeView />);
    expect(screen.getAllByTestId('animal-card')).toHaveLength(3);
  });

  it('does not show the empty-state message when there are liked animals', () => {
    useLikeStore.setState({
      likes: [makeAnimal('42')],
    });
    render(<LikeView />);
    expect(screen.queryByText('북마크한 동물이 없습니다.')).toBeNull();
  });
});
