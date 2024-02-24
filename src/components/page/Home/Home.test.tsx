import { FC, ComponentPropsWithRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import PrefectureFieldset from '@/components/model/Prefecture/PrefectureFieldset';
import PopulationGraph from '@/components/model/Population/PopulationGraph';
import Alert from '@/components/common/Alert';
import Toast from '@/components/common/Toast';
import * as usePrefecture from '@/hooks/usePrefecture';
import * as usePopulation from '@/hooks/usePopulation';
import { prefectures } from '@/mock/data/prefecture';
import { populations } from '@/mock/data/population';
import { SeriesLineOptions } from 'highcharts';

jest.mock('@/components/common/Alert', () => {
  const dummyAlert: FC<ComponentPropsWithRef<typeof Alert>> = ({
    type,
    children,
  }) => {
    return (
      <div data-testid="dummyAlert">
        <div data-testid="dummyAlertType">{type}</div>
        <div data-testid="dummyAlertChildren">{children}</div>
      </div>
    );
  };
  return dummyAlert;
});

jest.mock('@/components/common/Toast', () => {
  const dummyAlert: FC<ComponentPropsWithRef<typeof Toast>> = ({
    isOpen,
    onClose,
    children,
  }) => {
    return (
      <div data-testid="dummyToast">
        <div data-testid="dummyToastOpen">{isOpen ? 'true' : 'false'}</div>
        <button onClick={onClose}>dummy</button>
        <div data-testid="dummyToastChildren">{children}</div>
      </div>
    );
  };
  return dummyAlert;
});

jest.mock('@/components/model/Prefecture/PrefectureFieldset', () => {
  const dummyPrefectureFieldset: FC<
    ComponentPropsWithRef<typeof PrefectureFieldset>
  > = ({ prefectures, handleCheck }) => {
    return (
      <div>
        {prefectures?.map((prefecture) => (
          <div key={prefecture.prefCode} data-testid="dummyPrefectureFieldset">
            <div data-testid="dummyValue">{`${prefecture.prefCode}-${prefecture.prefName}`}</div>
            <input
              data-testid="dummyCheckBox"
              type="checkbox"
              onChange={() =>
                handleCheck(prefecture.prefCode, prefecture.prefName)
              }
            />
          </div>
        ))}
      </div>
    );
  };
  return dummyPrefectureFieldset;
});

jest.mock('@/components/model/Population/PopulationGraph', () => {
  const dummyPopulationGraph: FC<
    ComponentPropsWithRef<typeof PopulationGraph>
  > = ({ data }) => {
    return (
      <div>
        {data?.map((population, i) => (
          <div key={population.name} data-testid="dummyPopulationGraph">
            <div data-testid="dummyTypeName">{`${population.type}-${population.name}`}</div>
            {(population as SeriesLineOptions).data?.map((d, l) => (
              <div key={l} data-testid={`dummyGraphData-${i}`}>{`${d}`}</div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  return dummyPopulationGraph;
});

describe('Home', () => {
  test('render: loading', async () => {
    const response: ReturnType<typeof usePrefecture.default> = {
      prefectures: undefined,
      isLoading: true,
      errorMessage: '',
    };
    jest.spyOn(usePrefecture, 'default').mockReturnValue(response);

    render(<Home />);
    screen.getByText('Loading...');
  });

  test('render: getPrefectures error - hand over props: Alert', async () => {
    const response: ReturnType<typeof usePrefecture.default> = {
      prefectures: undefined,
      isLoading: false,
      errorMessage:
        '都道府県データの取得に失敗しました。お手数ですが、お時間経過後に再度お試しください。',
    };
    jest.spyOn(usePrefecture, 'default').mockReturnValue(response);

    render(<Home />);
    const dummyAlertType = screen.getAllByTestId('dummyAlertType')[0];
    expect(dummyAlertType).toHaveTextContent('error');
    const dummyAlertChildren = screen.getAllByTestId('dummyAlertChildren')[0];
    expect(dummyAlertChildren).toHaveTextContent(
      '都道府県データの取得に失敗しました。お手数ですが、お時間経過後に再度お試しください。',
    );
  });

  test('render: prefectures - hand over props: PrefectureFieldset', async () => {
    const response: ReturnType<typeof usePrefecture.default> = {
      prefectures,
      isLoading: false,
      errorMessage: '',
    };
    jest.spyOn(usePrefecture, 'default').mockReturnValue(response);

    const handlePrefectureCheck = jest.fn();
    const handleResetError = jest.fn();
    const response2: ReturnType<typeof usePopulation.default> = {
      populations: [],
      isLoading: false,
      errorMessage: '',
      handlePrefectureCheck,
      handleResetError,
    };
    jest.spyOn(usePopulation, 'default').mockReturnValue(response2);

    render(<Home />);

    const dummyPrefectureFieldsetList = screen.getAllByTestId(
      'dummyPrefectureFieldset',
    );
    expect(dummyPrefectureFieldsetList).toHaveLength(prefectures.result.length);
    const dummyValueList = screen.getAllByTestId('dummyValue');
    dummyValueList.forEach((value, i) => {
      expect(value).toHaveTextContent(
        `${prefectures.result[i].prefCode}-${prefectures.result[i].prefName}`,
      );
    });
    const dummyCheckboxList = screen.getAllByTestId('dummyCheckBox')[0];
    fireEvent.click(dummyCheckboxList);
    expect(handlePrefectureCheck).toHaveBeenCalledTimes(1);
  });

  test('render: population - hand over props: PopulationGraph', async () => {
    const response: ReturnType<typeof usePrefecture.default> = {
      prefectures,
      isLoading: false,
      errorMessage: '',
    };
    jest.spyOn(usePrefecture, 'default').mockReturnValue(response);

    const handlePrefectureCheck = jest.fn();
    const handleResetError = jest.fn();
    const response2: ReturnType<typeof usePopulation.default> = {
      populations,
      isLoading: false,
      errorMessage: '',
      handlePrefectureCheck,
      handleResetError,
    };
    jest.spyOn(usePopulation, 'default').mockReturnValue(response2);

    render(<Home />);

    const dummyPrefectureFieldsetList = screen.getAllByTestId(
      'dummyPopulationGraph',
    );
    expect(dummyPrefectureFieldsetList).toHaveLength(populations.length);
    const dummyTypeNameList = screen.getAllByTestId('dummyTypeName');
    dummyTypeNameList.forEach((tn, i) => {
      expect(tn).toHaveTextContent(
        `${populations[i].type}-${populations[i].name}`,
      );
      const dummyGraphData = screen.getAllByTestId(`dummyGraphData-${i}`);
      dummyGraphData.forEach((d, l) => {
        const data = (populations[i] as SeriesLineOptions).data;
        expect(d.textContent).toEqual(data ? data[l]?.toString() : '');
      });
    });
    const dummyCheckboxList = screen.getAllByTestId('dummyCheckBox')[0];
    fireEvent.click(dummyCheckboxList);
    expect(handlePrefectureCheck).toHaveBeenCalledTimes(1);

    const dummyToastOpen = screen.getByTestId('dummyToastOpen');
    expect(dummyToastOpen).toHaveTextContent('false');
    const dummyAlertChildren = screen.getByTestId('dummyAlertChildren');
    expect(dummyAlertChildren).toBeEmptyDOMElement();
  });

  test('render: getPopulation error', async () => {
    const response: ReturnType<typeof usePrefecture.default> = {
      prefectures,
      isLoading: false,
      errorMessage: '',
    };
    jest.spyOn(usePrefecture, 'default').mockReturnValue(response);

    const handlePrefectureCheck = jest.fn();
    const handleResetError = jest.fn();
    const response2: ReturnType<typeof usePopulation.default> = {
      populations: [],
      isLoading: false,
      errorMessage:
        '北海道の人口遷移データの取得に失敗しました。お手数ですが、お時間経過後に再度お試しください。',
      handlePrefectureCheck,
      handleResetError,
    };
    jest.spyOn(usePopulation, 'default').mockReturnValue(response2);

    render(<Home />);

    const dummyToastOpen = screen.getByTestId('dummyToastOpen');
    expect(dummyToastOpen).toHaveTextContent('true');
    const dummyAlertChildren = screen.getByTestId('dummyAlertChildren');
    expect(dummyAlertChildren).toHaveTextContent(
      '北海道の人口遷移データの取得に失敗しました。お手数ですが、お時間経過後に再度お試しください。',
    );
  });
});
