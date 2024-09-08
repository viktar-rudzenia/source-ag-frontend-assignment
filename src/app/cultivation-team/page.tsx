import CultivationTeamTable from '@/components/cultivation-team/CultivationTeamTable';

import styles from './page.module.scss';

export default function CultivationTeam() {
  return (
    <div className={styles.wrapper}>
      <CultivationTeamTable />
    </div>
  );
}
