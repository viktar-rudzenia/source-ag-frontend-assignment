import Link from 'next/link';

import { SharedButton } from '@/components/shared';
import { AllRoutesEnum } from '@/utils/constants';

import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>Home page for Source ag assignment</h1>
        <SharedButton>
          <Link className={styles.link} href={AllRoutesEnum.CULTIVATION_TEAM}>
            Go to cultivation team page
          </Link>
        </SharedButton>
      </div>
      <div className={styles.background} />
    </div>
  );
}
