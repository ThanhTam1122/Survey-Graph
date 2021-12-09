import { FC, MouseEventHandler } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';
import { breakPoint, zIndex } from '@/styles/constants';

type Props = {
  isOpen: boolean;
  autoHideDuration?: number;
  onClose: MouseEventHandler<HTMLButtonElement>;
};

const Toast: FC<Props> = ({
  isOpen,
  autoHideDuration = 3000,
  onClose,
  children,
}) => {
  // 指定時間後にトーストを閉じる
  if (isOpen) {
    setTimeout(onClose, autoHideDuration);
  }

  // クライアント側の処理になるので、Next.jsでのサーバ側ではポータルを使わないようにする
  if (!process.browser) {
    return (
      <div css={[toast, isOpen && toastOpen]} data-testid="notPortalToast">
        {children}
      </div>
    );
  }
  return createPortal(
    <div css={[toast, isOpen && toastOpen]} data-testid="portalToast">
      {children}
    </div>,
    document.body
  );
};

const toast = css`
  position: fixed;
  right: 8px;
  bottom: 8px;
  left: 8px;
  z-index: ${zIndex.toast};
  display: flex;
  visibility: hidden;

  @media (min-width: ${breakPoint.sm}px) {
    right: auto;
    bottom: 24px;
    left: 24px;
  }
`;

const toastOpen = css`
  visibility: visible;
`;

export default Toast;
