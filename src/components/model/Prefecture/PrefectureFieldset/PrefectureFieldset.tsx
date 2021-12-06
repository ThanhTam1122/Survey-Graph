import { VFC, ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { Prefecture } from '@/models/Prefecture';
import CheckBox from '@/components/common/CheckBox';

type Props = {
  prefectures?: Prefecture[];
  handleCheck: (
    prefCode: number,
    prefName: string
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
};

const PrefectureFieldset: VFC<Props> = ({ prefectures, handleCheck }) => {
  return (
    <fieldset css={prefectureFieldset}>
      <legend css={prefectureLegend}>都道府県</legend>
      <div css={prefectureLayout}>
        {prefectures?.map((prefecture) => {
          return (
            <CheckBox
              key={prefecture.prefCode}
              label={prefecture.prefName}
              onChange={handleCheck(prefecture.prefCode, prefecture.prefName)}
            />
          );
        })}
      </div>
    </fieldset>
  );
};

const prefectureFieldset = css`
  border: none;
`;

const prefectureLegend = css`
  font-size: 32px;
`;

const prefectureLayout = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 136px));
  gap: 8px;
`;

export default PrefectureFieldset;
