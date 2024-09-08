'use client';

import { useMemo } from 'react';
import useSWR from 'swr';
import { Button, Spin } from 'antd';

import { ApiRoutes } from '@/utils/constants';
import { fetcher } from '@/utils/fetcher';
import { CultivationRolesInterface } from '@/utils/interfaces';
import CultivationRoleChangeDropdown from '../CultivationRoleChangeDropdown';

import styles from './index.module.scss';

export default function CultivationRoleColumnCell({
  roleId,
  user,
}: {
  roleId: number;
  user: { id: number; name: string };
}) {
  const {
    data: cultivationRolesData,
    isLoading: isCultivationRolesDataLoading,
    error: cultivationDataError,
    mutate: mutateCultivationsData,
  } = useSWR<CultivationRolesInterface[]>(ApiRoutes.cultivationRoles, fetcher);

  const cultivationRolesObj = useMemo(() => {
    const cultivationRoles: { [key: string]: CultivationRolesInterface } = {};
    cultivationRolesData?.forEach((cultivationRole) => {
      cultivationRoles[cultivationRole.id] = cultivationRole;
    });
    return cultivationRoles;
  }, [cultivationRolesData]);

  return (
    <div className={styles.wrapper}>
      {isCultivationRolesDataLoading && <Spin size="large" />}

      {!isCultivationRolesDataLoading && (
        <>
          {cultivationRolesData && cultivationRolesData.length > 0 ? (
            <CultivationRoleChangeDropdown
              cultivationRolesObj={cultivationRolesObj}
              roleId={roleId}
              user={user}
            />
          ) : (
            <div>Role id: {roleId}</div>
          )}
        </>
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
