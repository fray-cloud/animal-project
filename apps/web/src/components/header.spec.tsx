import { render, screen, fireEvent } from '@testing-library/react';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('front/hooks', () => ({
  useSido: () => ({ data: [] }),
}));

// AnimatedCityCarousel imports useAnimalInfoSidoCount — stub it out
jest.mock('front/site/home/AnimatedCityCarousel', () => ({
  AnimatedCityCarousel: () => null,
}));

// eslint-disable-next-line import/first
import Header from './header';

describe('Header', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('renders the logo text', () => {
    render(<Header />);
    expect(screen.getByText('유기동물 조회')).toBeTruthy();
  });

  it('navigates to / when the logo button is clicked', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('유기동물 조회'));
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
