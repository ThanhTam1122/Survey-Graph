import { FC } from 'react';
import { css } from '@emotion/react';
import Header from '@/components/common/Header';
import PrefectureFieldset from '@/components/model/Prefecture/PrefectureFieldset';
import PopulationGraph from '@/components/model/Population/PopulationGraph';
import Footer from '@/components/common/Footer';
import Alert from '@/components/common/Alert';
import Toast from '@/components/common/Toast';
import usePrefecture from '@/hooks/usePrefecture';
import usePopulation from '@/hooks/usePopulation';
import { breakPoint } from '@/styles/constants';

const Home: FC = () => {
  const {
    prefectures,
    isLoading: isPrefectureLoading,
    errorMessage: prefectureErrMsg,
  } = usePrefecture();
  const {
    populations,
    isLoading: isPopulationLoading,
    errorMessage: populationErrMsg,
    handlePrefectureCheck,
    handleResetError,
  } = usePopulation();

  return (
    <div>
      <Header />
      <main css={main}>
        {isPrefectureLoading ? (
          // 都道府県 API 読み込み中の UI
          <div css={[container, mainLoadingLayout]}>
            <p css={mainLoadingText}>Loading...</p>
          </div>
        ) : prefectureErrMsg ? (
          // 都道府県 API エラー時の UI
          <div css={container}>
            <Alert type="error">{prefectureErrMsg}</Alert>
          </div>
        ) : (
          // 都道府県 API データ取得成功時の UI
          prefectures && (
            <div css={[container, mainLayout]}>
              <PrefectureFieldset
                prefectures={prefectures?.result}
                isPopulationLoading={isPopulationLoading}
                handleCheck={handlePrefectureCheck}
              />
              <PopulationGraph data={populations} />
            </div>
          )
        )}
      </main>
      <Footer />
      <Toast isOpen={!!populationErrMsg} onClose={handleResetError}>
        <Alert type="error">{populationErrMsg}</Alert>
      </Toast>
    </div>
  );
};

const main = css`
  min-height: 98vh;
  margin: 24px 0;
`;

const container = css`
  max-width: ${breakPoint.lg}px;
  padding: 0 4%;
  margin: 0 auto;

  @media (min-width: ${breakPoint.sm}px) {
    padding: 0 8%;
  }
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
