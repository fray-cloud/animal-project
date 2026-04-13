import { render, screen } from '@testing-library/react';

// eslint-disable-next-line import/first
import { PawLoader, AnimalCardSkeleton, SearchLoadingGrid } from './loading';

describe('PawLoader', () => {
  it('renders the loading text', () => {
    render(<PawLoader />);
    expect(screen.getByText('불러오는 중...')).toBeTruthy();
  });

  it('accepts an optional className prop without throwing', () => {
    const { container } = render(<PawLoader className="py-6" />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe('AnimalCardSkeleton', () => {
  it('renders without throwing', () => {
    const { container } = render(<AnimalCardSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe('SearchLoadingGrid', () => {
  it('renders exactly 6 skeleton cards', () => {
    const { container } = render(<SearchLoadingGrid />);
    // Each AnimalCardSkeleton renders a div as first child; count them
    const grid = container.firstChild as HTMLElement;
    expect(grid.children.length).toBe(6);
  });
});
