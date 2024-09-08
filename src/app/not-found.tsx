import Link from 'next/link';

import { SharedButton } from '@/components/shared';
import { AllRoutesEnum } from '@/utils/constants';

import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.NotFound__wrapper}>
      <h2>Page not found...</h2>
      <p>We&apos;re unable to find the page you&apos;re looking for</p>
      <SharedButton>
        <Link className={styles.NotFound__link} href={AllRoutesEnum.HOME}>
          Back to Home
        </Link>
      </SharedButton>
    </div>
  );
}
