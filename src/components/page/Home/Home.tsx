import { VFC } from 'react';
import { css } from '@emotion/react';
import Header from '@/components/common/Header';
import PrefectureFieldset from '@/components/model/Prefecture/PrefectureFieldset';
import PopulationGraph from '@/components/model/Population/PopulationGraph';
import usePrefecture from '@/hooks/usePrefecture';
import usePopulation from '@/hooks/usePopulation';

const Home: VFC = () => {
  const { prefectures } = usePrefecture();
  const { populations, handlePrefectureCheck } = usePopulation();

  return (
    <div>
      <Header />

      <main css={main}>
        <div css={[container, mainLayout]}>
          <PrefectureFieldset
            prefectures={prefectures?.result}
            handleCheck={handlePrefectureCheck}
          />
          <PopulationGraph data={populations} />
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

export default Home;
