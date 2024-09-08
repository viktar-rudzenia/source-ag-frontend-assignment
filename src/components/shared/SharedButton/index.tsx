import { ReactNode } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

interface SharedButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  additionalClassName?: string;
}

export default function SharedButton({
  children,
  onClick,
  additionalClassName,
}: SharedButtonProps) {
  return (
    <button type="button" className={cn(styles.button, additionalClassName)} onClick={onClick}>
      {children}
    </button>
  );
}
