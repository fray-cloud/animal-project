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

  it('renders three nav items', () => {
    render(<Bottom />);
    expect(screen.getByLabelText('홈')).toBeTruthy();
    expect(screen.getByLabelText('조회')).toBeTruthy();
    expect(screen.getByLabelText('북마크')).toBeTruthy();
  });

  it('calls router.push with /search when 조회 is clicked', () => {
    render(<Bottom />);
    fireEvent.click(screen.getByLabelText('조회'));
    expect(mockPush).toHaveBeenCalledWith('/search');
  });

  it('calls router.push with /like when 북마크 is clicked', () => {
    render(<Bottom />);
    fireEvent.click(screen.getByLabelText('북마크'));
    expect(mockPush).toHaveBeenCalledWith('/like');
  });

  it('marks the active item with aria-current="page"', () => {
    mockPathname = '/like';
    render(<Bottom />);
    expect(screen.getByLabelText('북마크').getAttribute('aria-current')).toBe('page');
    expect(screen.getByLabelText('홈').getAttribute('aria-current')).toBeNull();
  });

  it('applies accent colour class to the active item label', () => {
    mockPathname = '/search';
    render(<Bottom />);
    // The active span text has text-accent class
    const activeBtn = screen.getByLabelText('조회');
    const label = activeBtn.querySelector('span');
    expect(label?.className).toMatch(/text-accent/);
  });
});
