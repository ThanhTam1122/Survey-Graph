import { SeriesOptionsType } from 'highcharts';
import { PopulationCategories } from '@/models/Population';

// 人口構成 API レスポンス
const populationCategories: PopulationCategories = {
  message: null,
  result: {
    boundaryYear: 2015,
    data: [
      {
        label: '総人口',
        data: [
          {
            year: 1960,
            value: 5039206,
          },
          {
            year: 1965,
            value: 5171800,
          },
          {
            year: 1970,
            value: 5184287,
          },
          {
            year: 1975,
            value: 5338206,
          },
          {
            year: 1980,
            value: 5575989,
          },
          {
            year: 1985,
            value: 5679439,
          },
          {
            year: 1990,
            value: 5643647,
          },
          {
            year: 1995,
            value: 5692321,
          },
          {
            year: 2000,
            value: 5683062,
          },
          {
            year: 2005,
            value: 5627737,
          },
          {
            year: 2010,
            value: 5506419,
          },
          {
            year: 2015,
            value: 5381733,
          },
          {
            year: 2020,
            value: 5216615,
          },
          {
            year: 2025,
            value: 5016554,
          },
          {
            year: 2030,
            value: 4791592,
          },
          {
            year: 2035,
            value: 4546357,
          },
          {
            year: 2040,
            value: 4280427,
          },
          {
            year: 2045,
            value: 4004973,
          },
        ],
      },
      {
        label: '年少人口',
        data: [
          {
            year: 1960,
            value: 1681479,
            rate: 33.3,
          },
          {
            year: 1965,
            value: 1462123,
            rate: 28.2,
          },
          {
            year: 1970,
            value: 1309487,
            rate: 25.2,
          },
          {
            year: 1975,
            value: 1312611,
            rate: 24.5,
          },
          {
            year: 1980,
            value: 1298324,
            rate: 23.2,
          },
          {
            year: 1985,
            value: 1217959,
            rate: 21.4,
          },
          {
            year: 1990,
            value: 1034251,
            rate: 18.3,
          },
          {
            year: 1995,
            value: 898673,
            rate: 15.7,
          },
          {
            year: 2000,
            value: 792352,
            rate: 13.9,
          },
          {
            year: 2005,
            value: 719057,
            rate: 12.7,
          },
          {
            year: 2010,
            value: 657312,
            rate: 11.9,
          },
          {
            year: 2015,
            value: 608296,
            rate: 11.3,
          },
          {
            year: 2020,
            value: 561558,
            rate: 10.7,
          },
          {
            year: 2025,
            value: 511677,
            rate: 10.1,
          },
          {
            year: 2030,
            value: 465307,
            rate: 9.7,
          },
          {
            year: 2035,
            value: 423382,
            rate: 9.3,
          },
          {
            year: 2040,
            value: 391086,
            rate: 9.1,
          },
          {
            year: 2045,
            value: 360177,
            rate: 8.9,
          },
        ],
      },
      {
        label: '生産年齢人口',
        data: [
          {
            year: 1960,
            value: 3145664,
            rate: 62.4,
          },
          {
            year: 1965,
            value: 3460359,
            rate: 66.9,
          },
          {
            year: 1970,
            value: 3575731,
            rate: 68.9,
          },
          {
            year: 1975,
            value: 3657884,
            rate: 68.5,
          },
          {
            year: 1980,
            value: 3823808,
            rate: 68.5,
          },
          {
            year: 1985,
            value: 3910729,
            rate: 68.8,
          },
          {
            year: 1990,
            value: 3924717,
            rate: 69.5,
          },
          {
            year: 1995,
            value: 3942868,
            rate: 69.2,
          },
          {
            year: 2000,
            value: 3832902,
            rate: 67.4,
          },
          {
            year: 2005,
            value: 3696064,
            rate: 65.6,
          },
          {
            year: 2010,
            value: 3482169,
            rate: 63.2,
          },
          {
            year: 2015,
            value: 3190804,
            rate: 59.2,
          },
          {
            year: 2020,
            value: 2959481,
            rate: 56.7,
          },
          {
            year: 2025,
            value: 2781175,
            rate: 55.4,
          },
          {
            year: 2030,
            value: 2594718,
            rate: 54.1,
          },
          {
            year: 2035,
            value: 2394230,
            rate: 52.6,
          },
          {
            year: 2040,
            value: 2140781,
            rate: 50,
          },
          {
            year: 2045,
            value: 1931265,
            rate: 48.2,
          },
        ],
      },
      {
        label: '老年人口',
        data: [
          {
            year: 1960,
            value: 212063,
            rate: 4.2,
          },
          {
            year: 1965,
            value: 249318,
            rate: 4.8,
          },
          {
            year: 1970,
            value: 299069,
            rate: 5.7,
          },
          {
            year: 1975,
            value: 366651,
            rate: 6.8,
          },
          {
            year: 1980,
            value: 451727,
            rate: 8.1,
          },
          {
            year: 1985,
            value: 549487,
            rate: 9.6,
          },
          {
            year: 1990,
            value: 674881,
            rate: 11.9,
          },
          {
            year: 1995,
            value: 844927,
            rate: 14.8,
          },
          {
            year: 2000,
            value: 1031552,
            rate: 18.1,
          },
          {
            year: 2005,
            value: 1205692,
            rate: 21.4,
          },
          {
            year: 2010,
            value: 1358068,
            rate: 24.6,
          },
          {
            year: 2015,
            value: 1558387,
            rate: 28.9,
          },
          {
            year: 2020,
            value: 1695576,
            rate: 32.5,
          },
          {
            year: 2025,
            value: 1723702,
            rate: 34.3,
          },
          {
            year: 2030,
            value: 1731567,
            rate: 36.1,
          },
          {
            year: 2035,
            value: 1728745,
            rate: 38,
          },
          {
            year: 2040,
            value: 1748560,
            rate: 40.8,
          },
          {
            year: 2045,
            value: 1713531,
            rate: 42.7,
          },
        ],
      },
    ],
  },
};

// 総人口のグラフ用整形データ
const populations: SeriesOptionsType[] = [
  {
    type: 'line',
    name: '北海道',
    data: [
      ['1960', 5039206],
      ['1965', 5171800],
      ['1970', 5184287],
      ['1975', 5338206],
      ['1980', 5575989],
      ['1985', 5679439],
      ['1990', 5643647],
      ['1995', 5692321],
      ['2000', 5683062],
      ['2005', 5627737],
      ['2010', 5506419],
      ['2015', 5381733],
      ['2020', 5216615],
      ['2025', 5016554],
      ['2030', 4791592],
      ['2035', 4546357],
      ['2040', 4280427],
      ['2045', 4004973],
    ],
  },
  {
    type: 'line',
    name: '青森県',
    data: [
      ['1960', 1426606],
      ['1965', 1416591],
      ['1970', 1427520],
      ['1975', 1468646],
      ['1980', 1523907],
      ['1985', 1524448],
      ['1990', 1482873],
      ['1995', 1481663],
      ['2000', 1475728],
      ['2005', 1436657],
      ['2010', 1373339],
      ['2015', 1308265],
      ['2020', 1235971],
      ['2025', 1157332],
      ['2030', 1076393],
      ['2035', 993737],
      ['2040', 908974],
      ['2045', 823610],
    ],
  },
];

export { populationCategories, populations };
