import Link from 'next/link';

import { PageRoutes } from '@/utils/constants';

import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h2>Page not found...</h2>
      <p>We&apos;re unable to find the page you&apos;re looking for</p>
      <Link className={styles.link} href={PageRoutes.HOME}>
        Back to Home
      </Link>
    </div>
  );
}
