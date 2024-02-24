import { FC } from 'react';
import { render, screen } from '@testing-library/react';
import HighchartsReact from 'highcharts-react-official';
import PopulationGraph from './PopulationGraph';
import { populations } from '@/mock/data/population';

jest.mock('highcharts-react-official', () => {
  const dummyHighchartsReact: FC<HighchartsReact.Props> = ({ options }) => {
    return (
      <div>
        <div data-testid="dummyHighchartsReactOptions">{`${options?.title?.text}:${options?.subtitle?.text}`}</div>
      </div>
    );
  };
  return dummyHighchartsReact;
});

describe('PopulationGraph', () => {
  test('hand over props: HighchartsReact', () => {
    render(<PopulationGraph data={populations} />);

    // props が子コンポーネントにちゃんと渡っているか確認
    expect(screen.getByTestId('dummyHighchartsReactOptions')).toHaveTextContent(
      '人口遷移グラフ:選択した都道府県のデータが表示されます。',
    );
  });
});
