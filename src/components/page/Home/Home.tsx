import { VFC } from 'react';
import { css } from '@emotion/react';
import Header from '@/components/common/Header';
import PrefectureFieldset from '@/components/model/Prefecture/PrefectureFieldset';
import PopulationGraph from '@/components/model/Population/PopulationGraph';
import Alert from '@/components/common/Alert';
import usePrefecture from '@/hooks/usePrefecture';
import usePopulation from '@/hooks/usePopulation';

const Home: VFC = () => {
  const { prefectures, isLoading, errorMessage } = usePrefecture();
  const { populations, handlePrefectureCheck } = usePopulation();

  return (
    <div>
      <Header />
      <main css={main}>
        {isLoading ? (
          // 読み込み中の UI
          <div css={[container, mainLoadingLayout]}>
            <p css={mainLoadingText}>Loading...</p>
          </div>
        ) : errorMessage ? (
          // エラー時の UI
          <div css={container}>
            <Alert type="error">{errorMessage}</Alert>
          </div>
        ) : (
          // データ取得成功時の UI
          <div css={[container, mainLayout]}>
            <PrefectureFieldset
              prefectures={prefectures?.result}
              handleCheck={handlePrefectureCheck}
            />
            <PopulationGraph data={populations} />
          </div>
        )}
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

const mainLoadingLayout = css`
  text-align: center;
`;

const mainLoadingText = css`
  font-size: 24px;
`;

const mainLayout = css`
  display: grid;
  row-gap: 32px;
`;

export default Home;
