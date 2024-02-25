import { render, screen } from '@testing-library/react';
import { matchers } from '@emotion/jest';
import Toast from './Toast';

expect.extend(matchers);

afterEach(() => {
  jest.useRealTimers();
});

describe('Toast', () => {
  test('props: isOpen=false', () => {
    render(<Toast isOpen={false} onClose={() => {}} />);

    expect(screen.getByTestId('portalToast')).not.toHaveStyleRule(
      'visibility',
      'visible',
    );
  });

  test('props: isOpen=opem', () => {
    render(<Toast isOpen onClose={() => {}} />);

    expect(screen.getByTestId('portalToast')).toHaveStyleRule(
      'visibility',
      'visible',
    );
  });

  test('props: autoHideDuration(defalut) + onClose', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    render(<Toast isOpen onClose={onClose} />);

    jest.advanceTimersByTime(2999);
    expect(onClose).not.toBeCalled();

    jest.advanceTimersByTime(1);

    expect(onClose).toBeCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('props: autoHideDuration + onClose', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    render(<Toast isOpen autoHideDuration={5000} onClose={onClose} />);

    jest.advanceTimersByTime(4999);
    expect(onClose).not.toBeCalled();

    jest.advanceTimersByTime(1);

    expect(onClose).toBeCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('props: children', () => {
    const children = <p>childrenテスト</p>;
    render(
      <Toast isOpen autoHideDuration={5000} onClose={() => {}}>
        {children}
      </Toast>,
    );
    const toast = screen.getByTestId('portalToast');

    expect(toast).toContainHTML('<p>childrenテスト</p>');
  });
});
