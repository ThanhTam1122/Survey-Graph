import { VFC, ChangeEventHandler } from 'react';
import { css } from '@emotion/react';

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
  width: 24px;
  height: 24px;
`;

const labelText = css`
  margin-left: 8px;
  font-size: 24px;
`;

export default CheckBox;
