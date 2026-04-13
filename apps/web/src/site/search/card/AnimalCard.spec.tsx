import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { AnimalInfo } from '@animal-project/shared-types';
import { useLikeStore } from 'front/hooks/store';

// Pass-through framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
      <div {...rest}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Stub vaul-backed Drawer components to avoid matchMedia / portal issues
jest.mock('front/components/ui/drawer', () => ({
  Drawer: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div data-testid="drawer">{children}</div> : null,
  DrawerContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DrawerHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DrawerTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  DrawerDescription: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
}));

// window.matchMedia stub (vaul / jsdom)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// eslint-disable-next-line import/first
import { AnimalCard } from './AnimalCard';

const makeAnimal = (overrides: Partial<AnimalInfo> = {}): AnimalInfo => ({
  desertionNo: 'D001',
  kindNm: '믹스견',
  upKindNm: '개',
  sexCd: 'M',
  neuterYn: 'Y',
  age: '2020(년생)',
  weight: '5kg',
  colorCd: '흰색',
  processState: '보호중',
  popfile1: 'http://example.com/img.jpg',
  ...overrides,
} as AnimalInfo);

describe('AnimalCard', () => {
  beforeEach(() => {
    useLikeStore.setState({ likes: [] });
  });

  it('renders the breed name', () => {
    render(<AnimalCard item={makeAnimal()} />);
    expect(screen.getByText('믹스견')).toBeTruthy();
  });

  it('renders the sex badge as 수컷 for sexCd M', () => {
    render(<AnimalCard item={makeAnimal({ sexCd: 'M' })} />);
    expect(screen.getByText('수컷')).toBeTruthy();
  });

  it('renders the sex badge as 암컷 for sexCd F', () => {
    render(<AnimalCard item={makeAnimal({ sexCd: 'F' })} />);
    expect(screen.getByText('암컷')).toBeTruthy();
  });

  it('renders the sex badge as 미상 for unknown sexCd', () => {
    render(<AnimalCard item={makeAnimal({ sexCd: 'Q' })} />);
    expect(screen.getByText('미상')).toBeTruthy();
  });

  it('renders the process state badge', () => {
    render(<AnimalCard item={makeAnimal({ processState: '보호중' })} />);
    // at least one "보호중" badge visible
    expect(screen.getAllByText('보호중').length).toBeGreaterThan(0);
  });

  it('shows the bookmark button with label 북마크 when not bookmarked', () => {
    render(<AnimalCard item={makeAnimal()} />);
    // Grab first bookmark button (there are two — card + drawer)
    expect(screen.getAllByLabelText('북마크')[0]).toBeTruthy();
  });

  it('toggles bookmark label to 북마크 취소 after clicking bookmark', async () => {
    render(<AnimalCard item={makeAnimal()} />);
    fireEvent.click(screen.getAllByLabelText('북마크')[0]);
    await waitFor(() => {
      expect(screen.getAllByLabelText('북마크 취소')[0]).toBeTruthy();
    });
  });

  it('adds the animal to the store when bookmarked', async () => {
    render(<AnimalCard item={makeAnimal()} />);
    fireEvent.click(screen.getAllByLabelText('북마크')[0]);
    await waitFor(() => {
      expect(useLikeStore.getState().likes).toHaveLength(1);
    });
  });

  it('removes the animal from the store when bookmark is toggled off', async () => {
    render(<AnimalCard item={makeAnimal()} />);
    const [bookmarkBtn] = screen.getAllByLabelText('북마크');
    fireEvent.click(bookmarkBtn);
    await waitFor(() => expect(useLikeStore.getState().likes).toHaveLength(1));
    const [cancelBtn] = screen.getAllByLabelText('북마크 취소');
    fireEvent.click(cancelBtn);
    await waitFor(() => {
      expect(useLikeStore.getState().likes).toHaveLength(0);
    });
  });

  it('opens the drawer when the card is clicked', async () => {
    const { container } = render(<AnimalCard item={makeAnimal()} />);
    expect(screen.queryByTestId('drawer')).toBeNull();
    // The card is a div with role="button" — query by the outer div directly
    const card = container.querySelector('[role="button"]') as HTMLElement;
    fireEvent.click(card);
    await waitFor(() => {
      expect(screen.getByTestId('drawer')).toBeTruthy();
    });
  });

  it('shows the breed name in the drawer header', async () => {
    const { container } = render(<AnimalCard item={makeAnimal()} />);
    const card = container.querySelector('[role="button"]') as HTMLElement;
    fireEvent.click(card);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /믹스견/ })).toBeTruthy();
    });
  });

  it('shows the desertionNo in the drawer description', async () => {
    const { container } = render(<AnimalCard item={makeAnimal({ desertionNo: 'XYZ999' })} />);
    const card = container.querySelector('[role="button"]') as HTMLElement;
    fireEvent.click(card);
    await waitFor(() => {
      expect(screen.getByText(/XYZ999/)).toBeTruthy();
    });
  });
});

describe('AnimalCard SafeImage', () => {
  beforeEach(() => {
    useLikeStore.setState({ likes: [] });
  });

  it('renders an img element when popfile1 is provided', () => {
    render(<AnimalCard item={makeAnimal({ popfile1: 'http://example.com/dog.jpg' })} />);
    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBeGreaterThan(0);
  });

  it('shows fallback text when image errors out', async () => {
    render(<AnimalCard item={makeAnimal({ popfile1: 'http://example.com/bad.jpg' })} />);
    const img = screen.getAllByRole('img')[0];
    await act(async () => {
      fireEvent.error(img);
    });
    expect(screen.getByText('이미지를 불러올 수 없습니다')).toBeTruthy();
  });

  it('shows paw placeholder when no popfile1', () => {
    render(<AnimalCard item={makeAnimal({ popfile1: undefined })} />);
    expect(screen.queryByRole('img')).toBeNull();
  });
});
