import { VFC } from 'react';
import { css } from '@emotion/react';
import Header from '@/components/common/Header';
import PrefectureFieldset from '@/components/model/Prefecture/PrefectureFieldset';
import PopulationGraph from '@/components/model/Population/PopulationGraph';
import usePrefecture from '@/hooks/usePrefecture';

const Home: VFC = () => {
  const { prefectures } = usePrefecture();
  return (
    <div>
      <Header />

      <main css={main}>
        <div css={[container, mainLayout]}>
          <PrefectureFieldset prefectures={prefectures?.result} />
          <PopulationGraph data={data} />
        </div>
      </main>
    </div>
  );
};

const main = css`
  margin: 24px 0;
`;

const container = css`
  max-width: 1280px;
  padding: 0 8%;
  margin: 0 auto;
`;

const mainLayout = css`
  display: grid;
  row-gap: 32px;
`;

// モック用データ
const prefectures = [
  {
    prefCode: 1,
    prefName: '北海道',
  },
  {
    prefCode: 2,
    prefName: '青森県',
  },
  {
    prefCode: 3,
    prefName: '岩手県',
  },
  {
    prefCode: 4,
    prefName: '宮城県',
  },
  {
    prefCode: 5,
    prefName: '秋田県',
  },
  {
    prefCode: 6,
    prefName: '山形県',
  },
  {
    prefCode: 7,
    prefName: '福島県',
  },
  {
    prefCode: 8,
    prefName: '茨城県',
  },
  {
    prefCode: 9,
    prefName: '栃木県',
  },
  {
    prefCode: 10,
    prefName: '群馬県',
  },
  {
    prefCode: 11,
    prefName: '埼玉県',
  },
  {
    prefCode: 12,
    prefName: '千葉県',
  },
  {
    prefCode: 13,
    prefName: '東京都',
  },
  {
    prefCode: 14,
    prefName: '神奈川県',
  },
  {
    prefCode: 15,
    prefName: '新潟県',
  },
  {
    prefCode: 16,
    prefName: '富山県',
  },
  {
    prefCode: 17,
    prefName: '石川県',
  },
  {
    prefCode: 18,
    prefName: '福井県',
  },
  {
    prefCode: 19,
    prefName: '山梨県',
  },
  {
    prefCode: 20,
    prefName: '長野県',
  },
  {
    prefCode: 21,
    prefName: '岐阜県',
  },
  {
    prefCode: 22,
    prefName: '静岡県',
  },
  {
    prefCode: 23,
    prefName: '愛知県',
  },
  {
    prefCode: 24,
    prefName: '三重県',
  },
  {
    prefCode: 25,
    prefName: '滋賀県',
  },
  {
    prefCode: 26,
    prefName: '京都府',
  },
  {
    prefCode: 27,
    prefName: '大阪府',
  },
  {
    prefCode: 28,
    prefName: '兵庫県',
  },
  {
    prefCode: 29,
    prefName: '奈良県',
  },
  {
    prefCode: 30,
    prefName: '和歌山県',
  },
  {
    prefCode: 31,
    prefName: '鳥取県',
  },
  {
    prefCode: 32,
    prefName: '島根県',
  },
  {
    prefCode: 33,
    prefName: '岡山県',
  },
  {
    prefCode: 34,
    prefName: '広島県',
  },
  {
    prefCode: 35,
    prefName: '山口県',
  },
  {
    prefCode: 36,
    prefName: '徳島県',
  },
  {
    prefCode: 37,
    prefName: '香川県',
  },
  {
    prefCode: 38,
    prefName: '愛媛県',
  },
  {
    prefCode: 39,
    prefName: '高知県',
  },
  {
    prefCode: 40,
    prefName: '福岡県',
  },
  {
    prefCode: 41,
    prefName: '佐賀県',
  },
  {
    prefCode: 42,
    prefName: '長崎県',
  },
  {
    prefCode: 43,
    prefName: '熊本県',
  },
  {
    prefCode: 44,
    prefName: '大分県',
  },
  {
    prefCode: 45,
    prefName: '宮崎県',
  },
  {
    prefCode: 46,
    prefName: '鹿児島県',
  },
  {
    prefCode: 47,
    prefName: '沖縄県',
  },
];

const data: Highcharts.SeriesOptionsType[] = [
  {
    type: 'line',
    name: '北海道',
    data: [
      5039206, 5171800, 5184287, 5338206, 5575989, 5679439, 5643647, 5692321,
      5683062, 5627737, 5506419, 5381733, 5216615, 5016554, 4791592, 4546357,
      4280427, 4004973,
    ],
  },
  {
    type: 'line',
    name: '青森県',
    data: [
      1426606, 1416591, 1427520, 1468646, 1523907, 1524448, 1482873, 1481663,
      1475728, 1436657, 1373339, 1308265, 1235971, 1157332, 1076393, 993737,
      908974, 823610,
    ],
  },
];

export default Home;
