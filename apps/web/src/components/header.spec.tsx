import { render, screen, fireEvent } from '@testing-library/react';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('front/hooks', () => ({
  useSido: () => ({ data: [] }),
}));

jest.mock('front/site/home/Count', () => ({
  CountList: () => null,
}));

import Header from './header';

describe('Header', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('renders the title link', () => {
    render(<Header />);
    expect(screen.getByText('유기동물 조회 서비스')).toBeTruthy();
  });

  it('navigates to / when the title is clicked', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('유기동물 조회 서비스'));
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
