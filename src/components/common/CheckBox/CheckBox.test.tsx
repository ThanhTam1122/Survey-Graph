import { render, screen, fireEvent } from '@testing-library/react';
import CheckBox from './CheckBox';

describe('CheckBox', () => {
  test('props: label', () => {
    const labelText = 'label text';
    render(<CheckBox label={labelText} onChange={() => {}} />);

    expect(screen.getByTestId('checkboxLabelText')).toHaveTextContent(
      labelText,
    );
  });

  test('props: onChange', () => {
    const onChange = jest.fn();
    render(<CheckBox label="" onChange={onChange} />);

    expect(onChange).not.toBeCalled();

    fireEvent.click(screen.getByTestId('checkbox'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
