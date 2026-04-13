import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SubmitHandler } from 'react-hook-form';
import { AnimalInfoRequestType } from '@animal-project/shared-types';

// Suppress DevTool in tests
jest.mock('@hookform/devtools', () => ({ DevTool: () => null }));

// Pass-through AnimatePresence and motion.div so conditional visibility is DOM-driven
jest.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
      <div {...rest}>{children}</div>
    ),
  },
}));

// Mock child selects with simple <select> wrappers so Form tests focus on visibility
jest.mock('./select/SidoSelect', () => ({
  SidoSelect: ({ register, name }: { register: (n: string) => object; name: string }) => (
    <select aria-label="시도" {...register(name)}>
      <option value="">모두</option>
      <option value="6110000">서울</option>
    </select>
  ),
}));

jest.mock('./select/SigunguSelect', () => ({
  SigunguSelect: ({ register, name }: { register: (n: string) => object; name: string }) => (
    <select aria-label="시군구" {...register(name)}>
      <option value="">모두</option>
      <option value="3020000">종로구</option>
    </select>
  ),
}));

jest.mock('./select/ShelterSelect', () => ({
  ShelterSelect: ({ register, name }: { register: (n: string) => object; name: string }) => (
    <select aria-label="보호소" {...register(name)}>
      <option value="">모두</option>
      <option value="CARE001">테스트 보호소</option>
    </select>
  ),
}));

jest.mock('./select/UpkindSelect', () => ({
  UpkindSelect: ({ register, name }: { register: (n: string) => object; name: string }) => (
    <select aria-label="대종류" {...register(name)}>
      <option value="">모두</option>
      <option value="417000">개</option>
    </select>
  ),
}));

jest.mock('./select/KindSelect', () => ({
  KindSelect: ({ register, name }: { register: (n: string) => object; name: string }) => (
    <select aria-label="종류" {...register(name)}>
      <option value="">모두</option>
      <option value="000101">믹스견</option>
    </select>
  ),
}));

// eslint-disable-next-line import/first
import { SearchForm } from './Form';

const noop: SubmitHandler<AnimalInfoRequestType> = jest.fn();

describe('SearchForm', () => {
  it('renders the 장소 and 동물종류 group labels', () => {
    render(<SearchForm submitHandler={noop} />);
    expect(screen.getByText('장소')).toBeTruthy();
    expect(screen.getByText('동물종류')).toBeTruthy();
  });

  it('renders the 시도 select initially', () => {
    render(<SearchForm submitHandler={noop} />);
    expect(screen.getByLabelText('시도')).toBeTruthy();
  });

  it('does not show 시군구 select when 시도 is blank', () => {
    render(<SearchForm submitHandler={noop} />);
    // Default upr_cd is '' — sigungu should be hidden
    expect(screen.queryByLabelText('시군구')).toBeNull();
  });

  it('reveals 시군구 select after a 시도 is chosen', async () => {
    render(<SearchForm submitHandler={noop} />);
    fireEvent.change(screen.getByLabelText('시도'), { target: { value: '6110000' } });
    await waitFor(() => {
      expect(screen.getByLabelText('시군구')).toBeTruthy();
    });
  });

  it('does not show 보호소 select when 시군구 is blank', async () => {
    render(<SearchForm submitHandler={noop} />);
    fireEvent.change(screen.getByLabelText('시도'), { target: { value: '6110000' } });
    await waitFor(() => {
      expect(screen.getByLabelText('시군구')).toBeTruthy();
    });
    // org_cd is still '' — shelter should be hidden
    expect(screen.queryByLabelText('보호소')).toBeNull();
  });

  it('reveals 보호소 select after 시도 and 시군구 are both chosen', async () => {
    render(<SearchForm submitHandler={noop} />);
    fireEvent.change(screen.getByLabelText('시도'), { target: { value: '6110000' } });
    await waitFor(() => expect(screen.getByLabelText('시군구')).toBeTruthy());
    fireEvent.change(screen.getByLabelText('시군구'), { target: { value: '3020000' } });
    await waitFor(() => {
      expect(screen.getByLabelText('보호소')).toBeTruthy();
    });
  });

  it('does not show 종류 select when 대종류 is blank', () => {
    render(<SearchForm submitHandler={noop} />);
    // Default upkind is '' — kind should be hidden
    expect(screen.queryByLabelText('종류')).toBeNull();
  });

  it('reveals 종류 select after a 대종류 is chosen', async () => {
    render(<SearchForm submitHandler={noop} />);
    fireEvent.change(screen.getByLabelText('대종류'), { target: { value: '417000' } });
    await waitFor(() => {
      expect(screen.getByLabelText('종류')).toBeTruthy();
    });
  });

  it('renders the 초기화 button', () => {
    render(<SearchForm submitHandler={noop} />);
    expect(screen.getByRole('button', { name: '초기화' })).toBeTruthy();
  });

  it('renders the 검색 submit button', () => {
    render(<SearchForm submitHandler={noop} />);
    expect(screen.getByRole('button', { name: '검색' })).toBeTruthy();
  });

  it('calls submitHandler when 검색 is clicked with valid data', async () => {
    const handler = jest.fn();
    render(<SearchForm submitHandler={handler} />);
    fireEvent.click(screen.getByRole('button', { name: '검색' }));
    await waitFor(() => {
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  it('resets 시군구 and 보호소 visibility after 초기화 is clicked', async () => {
    render(<SearchForm submitHandler={noop} />);
    // Reveal sigungu + shelter
    fireEvent.change(screen.getByLabelText('시도'), { target: { value: '6110000' } });
    await waitFor(() => expect(screen.getByLabelText('시군구')).toBeTruthy());
    fireEvent.change(screen.getByLabelText('시군구'), { target: { value: '3020000' } });
    await waitFor(() => expect(screen.getByLabelText('보호소')).toBeTruthy());

    // Reset
    fireEvent.click(screen.getByRole('button', { name: '초기화' }));

    await waitFor(() => {
      expect(screen.queryByLabelText('시군구')).toBeNull();
      expect(screen.queryByLabelText('보호소')).toBeNull();
    });
  });
});
