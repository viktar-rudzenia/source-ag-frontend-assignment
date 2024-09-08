import Link from 'next/link';

import { SharedButton } from '@/components/shared';
import { PageRoutes } from '@/utils/constants';

import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>Home page for Source ag assignment</h1>
        <SharedButton>
          <Link className={styles.link} href={PageRoutes.CULTIVATIONS}>
            Go to cultivations page
          </Link>
        </SharedButton>
      </div>
      <div className={styles.background} />
    </div>
  );
}
