import { AntdRegistry } from '@ant-design/nextjs-registry';

import styles from './index.module.scss';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <AntdRegistry>{children}</AntdRegistry>
    </div>
  );
}
