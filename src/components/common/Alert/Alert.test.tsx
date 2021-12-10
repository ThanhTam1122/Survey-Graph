/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { matchers } from '@emotion/jest';
import Alert from './Alert';
import { colors } from '@/styles/constants';

expect.extend(matchers);

describe('Alert', () => {
  test('props: type=info', () => {
    render(<Alert type="info" />);
    const alert = screen.getByTestId('alert');
    const alertType = screen.getByTestId('alertType');

    expect(alert).toHaveStyleRule('background-color', colors.alertInfoBgColor);
    expect(alert).toHaveStyleRule(
      'border',
      `1px solid ${colors.alertInfoColor}`
    );
    expect(alertType).toHaveTextContent('info');
    expect(alertType).toHaveStyleRule('color', colors.alertInfoColor);
  });

  test('props: type=error', () => {
    render(<Alert type="error" />);
    const alert = screen.getByTestId('alert');
    const alertType = screen.getByTestId('alertType');

    expect(alert).toHaveStyleRule('background-color', colors.alertErrorBgColor);
    expect(alert).toHaveStyleRule(
      'border',
      `1px solid ${colors.alertErrorColor}`
    );
    expect(alertType).toHaveTextContent('error');
    expect(alertType).toHaveStyleRule('color', colors.alertErrorColor);
  });

  test('props: children', () => {
    const children = <p>childrenテスト</p>;
    render(<Alert type="info">{children}</Alert>);
    const alert = screen.getByTestId('alert');

    expect(alert).toContainHTML('<p>childrenテスト</p>');
  });
});
