import { VFC } from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

type Props = {
  data: Highcharts.SeriesOptionsType[];
};

const PopulationGraph: VFC<Props> = ({ data }) => {
  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    HighchartsMore(Highcharts);
  }
  const options: Highcharts.Options = {
    title: {
      text: '人口遷移グラフ',
    },

    yAxis: {
      title: {
        align: 'high',
        offset: 0,
        text: '人口数',
        rotation: 0,
        y: -20,
      },
    },

    xAxis: {
      title: {
        align: 'high',
        text: '年度',
        x: 30,
        y: -20,
      },
      accessibility: {
        rangeDescription: 'Range: 1960 to 2045',
      },
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 1960,
        pointInterval: 5,
      },
    },

    series: data,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PopulationGraph;
