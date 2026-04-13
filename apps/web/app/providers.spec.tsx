import { render, screen } from '@testing-library/react';
import { Providers } from './providers';

describe('Providers', () => {
  it('renders children inside QueryClientProvider', () => {
    render(
      <Providers>
        <span>hello-children</span>
      </Providers>
    );
    expect(screen.getByText('hello-children')).toBeTruthy();
  });
});
