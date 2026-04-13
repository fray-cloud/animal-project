import { render, screen, fireEvent } from '@testing-library/react';

const mockPush = jest.fn();
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
}));

// eslint-disable-next-line import/first
import { Bottom } from './bottom';

describe('Bottom', () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockPathname = '/';
  });

  it('renders three nav items with aria labels', () => {
    render(<Bottom />);
    expect(screen.getByLabelText('홈')).toBeTruthy();
    expect(screen.getByLabelText('조회하기')).toBeTruthy();
    expect(screen.getByLabelText('좋아요')).toBeTruthy();
  });

  it('calls router.push with the item path on click', () => {
    render(<Bottom />);
    fireEvent.click(screen.getByLabelText('조회하기'));
    expect(mockPush).toHaveBeenCalledWith('/search');
  });

  it('marks the matching pathname item as active', () => {
    mockPathname = '/like';
    render(<Bottom />);
    expect(screen.getByLabelText('좋아요').className).toMatch(/text-primary/);
    expect(screen.getByLabelText('홈').className).not.toMatch(/text-primary/);
  });
});
