'use client'; // Error components must be Client Components
import { useEffect } from 'react';
import Link from 'next/link';

import { SharedButton } from '@/components/shared';
import { PageRoutes } from '@/utils/constants';

import styles from './error.module.scss';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <h2>Something went wrong!</h2>
      <SharedButton
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </SharedButton>
      or
      <Link className={styles.link} href={PageRoutes.HOME}>
        Back to Home
      </Link>
      or
      <SharedButton onClick={() => window.location.reload()}>Refresh the page</SharedButton>
    </div>
  );
}
