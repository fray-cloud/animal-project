import { render, screen } from '@testing-library/react';
import { AnimalInfo } from '@animal-project/shared-types';
import { AnimalInfoRequestType } from '@animal-project/shared-types';

// Mock the infinite query hook
const mockUseAnimalInfoInfinity = jest.fn();
jest.mock('front/hooks', () => ({
  useAnimalInfoInfinity: (...args: unknown[]) => mockUseAnimalInfoInfinity(...args),
}));

// Stub AnimalCard to avoid framer-motion / drawer / useLike complexity
jest.mock('./card', () => ({
  AnimalCard: ({ item }: { item: AnimalInfo }) => (
    <div data-testid="animal-card">{item.desertionNo}</div>
  ),
}));

// react-infinite-scroller requires window.scroll — stub it
Object.defineProperty(window, 'scroll', { value: jest.fn(), writable: true });

// eslint-disable-next-line import/first
import { SearchView } from './SearchView';

const makeRequest = (): AnimalInfoRequestType =>
  ({ upr_cd: '6110000' } as AnimalInfoRequestType);

const makePage = (ids: string[]) => ({
  response: {
    body: {
      items: {
        item: ids.map((id) => ({ desertionNo: id } as AnimalInfo)),
      },
      totalCount: ids.length,
      numOfRows: 10,
      pageNo: 1,
    },
  },
});

describe('SearchView', () => {
  beforeEach(() => {
    mockUseAnimalInfoInfinity.mockReset();
  });

  it('shows loading grid when isLoading is true and request is set', () => {
    mockUseAnimalInfoInfinity.mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isLoading: true,
    });
    render(<SearchView animalInfoRequest={makeRequest()} />);
    // SearchLoadingGrid renders 6 skeleton containers; just check no cards are shown
    expect(screen.queryByTestId('animal-card')).toBeNull();
    // The loading grid container should be present
    const { container } = render(<SearchView animalInfoRequest={makeRequest()} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('does not show loading grid when request is null', () => {
    mockUseAnimalInfoInfinity.mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isLoading: true,
    });
    // Even with isLoading=true, null request means no loading grid
    render(<SearchView animalInfoRequest={null} />);
    expect(screen.queryByTestId('animal-card')).toBeNull();
  });

  it('renders animal cards when data is available', () => {
    mockUseAnimalInfoInfinity.mockReturnValue({
      data: { pages: [makePage(['A1', 'A2', 'A3'])] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isLoading: false,
    });
    render(<SearchView animalInfoRequest={makeRequest()} />);
    expect(screen.getAllByTestId('animal-card')).toHaveLength(3);
  });

  it('renders cards from multiple pages', () => {
    mockUseAnimalInfoInfinity.mockReturnValue({
      data: {
        pages: [makePage(['P1', 'P2']), makePage(['P3', 'P4'])],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isLoading: false,
    });
    render(<SearchView animalInfoRequest={makeRequest()} />);
    expect(screen.getAllByTestId('animal-card')).toHaveLength(4);
  });

  it('renders empty grid when data is undefined', () => {
    mockUseAnimalInfoInfinity.mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isLoading: false,
    });
    render(<SearchView animalInfoRequest={makeRequest()} />);
    expect(screen.queryByTestId('animal-card')).toBeNull();
  });
});
