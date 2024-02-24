import { FC, ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { Prefecture } from '@/models/Prefecture';
import CheckBox from '@/components/common/CheckBox';
import { breakPoint } from '@/styles/constants';

type Props = {
  prefectures?: Prefecture[];
  handleCheck: (
    prefCode: number,
    prefName: string,
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
};

const PrefectureFieldset: FC<Props> = ({ prefectures, handleCheck }) => {
  return (
    <fieldset css={prefectureFieldset}>
      <legend css={prefectureLegend} data-testid="prefectureFieldsetLegend">
        都道府県
      </legend>
      <div css={prefectureLayout} data-testid="prefectureFieldsetData">
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
  padding-right: 0;
  padding-left: 0;
  border: none;
`;

const prefectureLegend = css`
  font-size: 24px;
  text-align: center;

  @media (min-width: ${breakPoint.sm}px) {
    font-size: 32px;
  }
`;

const prefectureLayout = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, 108px);
  gap: 8px;
  place-content: center;

  @media (min-width: ${breakPoint.sm}px) {
    grid-template-columns: repeat(auto-fit, 136px);
  }
`;

export default PrefectureFieldset;
