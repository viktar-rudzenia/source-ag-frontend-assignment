'use client';

import { useMemo } from 'react';
import useSWR from 'swr';
import { Button, Spin } from 'antd';

import { ApiRoutes } from '@/utils/constants';
import { fetcher } from '@/utils/fetcher';
import { CultivationRolesInterface } from '@/utils/interfaces';

import styles from './index.module.scss';

export default function CultivationRoleColumnCell({ roleId }: { roleId: number }) {
  const {
    data: cultivationRolesData,
    isLoading: isCultivationRolesDataLoading,
    error: cultivationDataError,
    mutate: mutateCultivationsData,
  } = useSWR<CultivationRolesInterface[]>(ApiRoutes.cultivationRoles, fetcher);

  const cultivationRolesObj = useMemo(() => {
    let cultivationRoles: { [key: string]: CultivationRolesInterface } = {};
    cultivationRolesData?.forEach((cultivationRole) => {
      cultivationRoles[cultivationRole.id] = cultivationRole;
    });
    return cultivationRoles;
  }, [cultivationRolesData]);

  return (
    <div className={styles.wrapper}>
      {isCultivationRolesDataLoading && <Spin size="large" />}

      {cultivationRolesData && cultivationRolesData.length > 0 ? (
        <div>{cultivationRolesObj[roleId]?.name}</div>
      ) : (
        <div>Role id: {roleId}</div>
      )}

      {!isCultivationRolesDataLoading && cultivationDataError && (
        <div className={styles.errorWrapper}>
          <div>An error occurred, please try downloading Cultivation roles again</div>

          <Button onClick={() => mutateCultivationsData()}>Retry</Button>
          <span>or</span>
          <Button onClick={() => window.location.reload()}>Refresh the page</Button>
        </div>
      )}
    </div>
  );
}
