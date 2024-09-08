'use client';

import useSWR from 'swr';
import { Button, Result, Spin, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import Link from 'next/link';

import { fetcher } from '@/utils/fetcher';
import { PageRoutes, ApiRoutes } from '@/utils/constants';

import styles from './index.module.scss';

interface CultivationInterface {
  id: string;
  name: string;
}

const cultivationColumns: TableColumnsType<CultivationInterface> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (_, { id }) => (
      <Link href={PageRoutes.getCultivationTeamRoute(id)}>Go to cultivation team page</Link>
    ),
  },
];

export default function CultivationsTable() {
  const {
    data: cultivationsData,
    isLoading: isCultivationsDataLoading,
    error: cultivationDataError,
    mutate: mutateCultivationsData,
  } = useSWR(ApiRoutes.cultivations, fetcher);

  return (
    <div className={styles.wrapper}>
      {isCultivationsDataLoading && <Spin size="large" />}

      {!isCultivationsDataLoading && cultivationDataError && (
        <Result
          status="warning"
          title={
            <div>
              An error occurred, please try downloading Cultivations again or refreshing the page
            </div>
          }
          extra={
            <>
              <Button onClick={() => mutateCultivationsData()}>
                Download Cultivations data again
              </Button>
              <span>or</span>
              <Button onClick={() => window.location.reload()}>Refresh the page</Button>
            </>
          }
        />
      )}

      {cultivationsData && cultivationsData.length > 0 && (
        <Table
          rowKey="id"
          className={styles.table}
          columns={cultivationColumns}
          dataSource={cultivationsData}
          pagination={{ position: ['bottomCenter'] }}
        />
      )}

      {!isCultivationsDataLoading && !cultivationDataError && cultivationsData.length === 0 && (
        <div className={styles.emptyCultivations}>Unfortunately, no cultivations were found.</div>
      )}
    </div>
  );
}
