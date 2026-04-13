import { render, screen, fireEvent } from '@testing-library/react';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// eslint-disable-next-line import/first
import { Contents } from './Contents';

describe('Contents (homepage hero)', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('renders the badge text', () => {
    render(<Contents />);
    expect(screen.getByText('전국 유기동물 보호소 정보')).toBeTruthy();
  });

  it('renders the main heading', () => {
    render(<Contents />);
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
    expect(screen.getByText(/당신이/)).toBeTruthy();
  });

  it('renders the sub-copy text', () => {
    render(<Contents />);
    expect(screen.getByText('여기 돌봄이 필요한 동물들이 있습니다.')).toBeTruthy();
    expect(screen.getByText('당신의 책임있는 사랑이 그들의 삶을 바꿀 수 있습니다.')).toBeTruthy();
  });

  it('renders the CTA button', () => {
    render(<Contents />);
    expect(screen.getByRole('button', { name: /유기동물 찾아보기/ })).toBeTruthy();
  });

  it('navigates to /search when CTA button is clicked', () => {
    render(<Contents />);
    fireEvent.click(screen.getByRole('button', { name: /유기동물 찾아보기/ }));
    expect(mockPush).toHaveBeenCalledWith('/search');
  });
});
