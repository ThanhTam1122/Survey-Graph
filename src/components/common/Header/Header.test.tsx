import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('no props contents', () => {
    render(<Header />);

    expect(screen.getByTestId('headerTitle')).toHaveTextContent(
      'RESAS Graph App',
    );
  });
});
