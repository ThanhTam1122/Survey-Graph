import { FC, ComponentPropsWithRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PrefectureFieldset from './PrefectureFieldset';
import CheckBox from '@/components/common/CheckBox';
import { prefectures } from '@/mock/data/prefecture';

jest.mock('@/components/common/CheckBox', () => {
  const DummyCheckBox: FC<ComponentPropsWithRef<typeof CheckBox>> = ({
    label,
    onChange,
  }) => {
    return (
      <div data-testid="dummyCheckBox">
        <div>{label}</div>
        <input className="dummyOnChange" type="checkbox" onChange={onChange} />
      </div>
    );
  };
  return DummyCheckBox;
});

describe('PrefectureFieldset', () => {
  test('no props contents', () => {
    const handleCheck = jest.fn();
    render(<PrefectureFieldset handleCheck={handleCheck} />);

    expect(screen.getByTestId('prefectureFieldsetLegend')).toHaveTextContent(
      '都道府県',
    );
  });

  test('props: prefectures undefined', () => {
    const handleCheck = jest.fn();
    render(<PrefectureFieldset handleCheck={handleCheck} />);

    expect(screen.getByTestId('prefectureFieldsetData').children)
      .toBeEmptyDOMElement;
  });

  test('props: prefectures', () => {
    const onChange = jest.fn();
    const handleCheck = jest.fn(() => onChange);
    render(
      <PrefectureFieldset
        prefectures={prefectures.result}
        handleCheck={handleCheck}
      />,
    );

    const dummyCheckBox = screen.getAllByTestId('dummyCheckBox');
    expect(dummyCheckBox).toHaveLength(47);
  });

  test('hand over props: CheckBox', () => {
    const onChange = jest.fn();
    const handleCheck = jest.fn(() => onChange);
    render(
      <PrefectureFieldset
        prefectures={prefectures.result}
        handleCheck={handleCheck}
      />,
    );

    // props が子コンポーネントにちゃんと渡っているか確認
    const dummyCheckBox = screen.getAllByTestId('dummyCheckBox');
    expect(
      dummyCheckBox.forEach((d, i) => {
        expect(d).toHaveTextContent(prefectures.result[i].prefName);
        fireEvent.click(d.getElementsByClassName('dummyOnChange')[0]);

        expect(onChange).toHaveBeenCalledTimes(i + 1);
      }),
    );
  });
});
