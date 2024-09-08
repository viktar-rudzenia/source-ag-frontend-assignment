import CultivationsTable from '@/components/cultivations/CultivationsTable';

import styles from './page.module.scss';

export default function Cultivations() {
  return (
    <div className={styles.wrapper}>
      <CultivationsTable />
    </div>
  );
}
