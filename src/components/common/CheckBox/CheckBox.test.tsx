import { render, screen, fireEvent } from '@testing-library/react';
import CheckBox from './CheckBox';

describe('CheckBox', () => {
  test('props: label', () => {
    const labelText = 'label text';
    render(
      <CheckBox label={labelText} isDisabled={false} onChange={() => {}} />,
    );

    expect(screen.getByTestId('checkboxLabelText')).toHaveTextContent(
      labelText,
    );
  });

  test('props: isDisabled=false', () => {
    render(<CheckBox label="" isDisabled={false} onChange={() => {}} />);

    expect(screen.getByTestId('checkbox')).toBeEnabled();
  });

  test('props: isDisabled=true', () => {
    render(<CheckBox label="" isDisabled={true} onChange={() => {}} />);

    expect(screen.getByTestId('checkbox')).toBeDisabled();
  });

  test('props: onChange', () => {
    const onChange = jest.fn();
    render(<CheckBox label="" isDisabled={false} onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('checkbox'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
