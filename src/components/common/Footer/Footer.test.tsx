import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  test('no props contents', () => {
    render(<Footer />);

    expect(screen.getByTestId('footerText')).toHaveTextContent(
      'このアプリは RESAS API のデータを使用しています。',
    );
  });
});
