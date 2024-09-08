'use client';

import useSWR from 'swr';
import { Button, Result, Spin, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import Link from 'next/link';

import { fetcher } from '@/utils/fetcher';
import { UserInCultivationInterface } from '@/utils/interfaces';
import { PageRoutes, ApiRoutes } from '@/utils/constants';
import { SharedButton } from '@/components/shared';
import { rowSelectionForCultivationTeam } from './constant';

import styles from './index.module.scss';

const cultivationTeamColumns: TableColumnsType<UserInCultivationInterface> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, { user }) => user.name,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (_, { role }) => role.id,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (_, { cultivation_id, user }) => (
      <Button type="primary" danger>
        Remove
      </Button>
    ),
  },
];

export default function CultivationTeamTable({ cultivationId }: { cultivationId: string }) {
  const {
    data: cultivationTeamData,
    isLoading: isCultivationTeamDataLoading,
    error: cultivationTeamDataError,
    mutate: mutateCultivationTeam,
  } = useSWR<UserInCultivationInterface[]>(
    ApiRoutes.getUsersInCultivationApi(cultivationId),
    fetcher
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <SharedButton>
          <Link className={styles.link} href={PageRoutes.CULTIVATIONS}>
            Go back to cultivations
          </Link>
        </SharedButton>
        <h2>Cultivation Team id: {cultivationId}</h2>
      </div>
      {isCultivationTeamDataLoading && <Spin size="large" />}

      {!isCultivationTeamDataLoading && cultivationTeamDataError && (
        <Result
          status="warning"
          title={
            <div className={styles.resultWarning}>
              An error occurred, please try downloading Cultivations again or refreshing the page
            </div>
          }
          extra={
            <>
              <Button onClick={() => mutateCultivationTeam()}>
                Download Cultivations data again
              </Button>
              <span>or</span>
              <Button onClick={() => window.location.reload()}>Refresh the page</Button>
            </>
          }
        />
      )}

      {cultivationTeamData && cultivationTeamData.length > 0 && (
        <Table
          rowSelection={rowSelectionForCultivationTeam}
          className={styles.table}
          columns={cultivationTeamColumns}
          dataSource={cultivationTeamData}
        />
      )}

      {!isCultivationTeamDataLoading &&
        !cultivationTeamDataError &&
        cultivationTeamData?.length === 0 && <div>Unfortunately, no cultivations were found.</div>}
    </div>
  );
}
