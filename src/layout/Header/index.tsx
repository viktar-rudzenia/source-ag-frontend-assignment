'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

import { PageRoutes } from '@/utils/constants';
import { navigationBarLinks } from './constants';

import styles from './index.module.scss';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.wrapper}>
      <div>
        <Link href={PageRoutes.HOME}>
          <Image
            className={styles.logoImage}
            src="/source-ag-logo.svg"
            alt="logo"
            width="150"
            height="70"
          />
        </Link>
      </div>

      <nav className={styles.navigationBar}>
        <ul className={styles.navigationList}>
          {Object.values(navigationBarLinks).map(({ id, name, href }) => (
            <li key={id}>
              <Link
                className={cn(styles.navigationBarLink, {
                  [styles.navigationBarLinkActive]: pathname === href,
                })}
                href={href}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
