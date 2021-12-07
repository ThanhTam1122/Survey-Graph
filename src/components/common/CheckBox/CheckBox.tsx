import { VFC, ChangeEventHandler } from 'react';
import { css } from '@emotion/react';
import { breakPoint } from '@/styles/constants';

type Props = {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const CheckBox: VFC<Props> = ({ label, onChange }) => {
  return (
    <label css={checkBoxControl}>
      <input css={checkBox} type="checkbox" onChange={onChange} />
      <span css={labelText}>{label}</span>
    </label>
  );
};

const checkBoxControl = css`
  display: flex;
  align-items: center;
`;

const checkBox = css`
  width: 18px;
  height: 18px;

  @media (min-width: ${breakPoint.sm}px) {
    width: 24px;
    height: 24px;
  }
`;

const labelText = css`
  margin-left: 8px;
  font-size: 18px;

  @media (min-width: ${breakPoint.sm}px) {
    margin-left: 8px;
    font-size: 24px;
  }
`;

export default CheckBox;
