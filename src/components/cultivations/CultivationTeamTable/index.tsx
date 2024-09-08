'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Button, Modal, Result, Spin, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { fetcher } from '@/utils/fetcher';
import { UserInCultivationInterface } from '@/utils/interfaces';
import { PageRoutes, ApiRoutes } from '@/utils/constants';
import { SharedButton } from '@/components/shared';
import CultivationRoleColumnCell from '../CultivationRoleCustomCell';
import CultivationRemoveUserButton from '../CultivationRemoveUserButton';
import AddUsersToCultivation from '../AddUsersToCultivation';

import styles from './index.module.scss';

export default function CultivationTeamTable() {
  const { cultivationId }: { cultivationId: string } = useParams();

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const {
    data: cultivationTeamData,
    isLoading: isCultivationTeamDataLoading,
    error: cultivationTeamDataError,
    mutate: mutateCultivationTeam,
  } = useSWR<UserInCultivationInterface[]>(
    ApiRoutes.getUsersInCultivationApi(cultivationId),
    fetcher
  );

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
      render: (_, { role, user }) => <CultivationRoleColumnCell roleId={role.id} user={user} />,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, { cultivation_id, user }) => (
        <CultivationRemoveUserButton cultivationId={cultivation_id} user={user} />
      ),
    },
  ];

  const cultivationTeamDataWithValidation = cultivationTeamData
    ? cultivationTeamData.filter((cultivation) => typeof cultivation.user.id === 'number')
    : [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Link className={styles.link} href={PageRoutes.CULTIVATIONS}>
          Go back to cultivations
        </Link>
        <h2>Cultivation Team id: {cultivationId}</h2>
      </div>
      {isCultivationTeamDataLoading && <Spin className={styles.loader} size="large" />}

      {!isCultivationTeamDataLoading && cultivationTeamDataError && (
        <Result
          status="warning"
          title={
            <div>
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
        <>
          <Table
            rowKey={(record) => `${record.cultivation_id}-${record.user.id}-${record.role.id}`}
            className={styles.table}
            columns={cultivationTeamColumns}
            dataSource={cultivationTeamDataWithValidation}
            pagination={{ position: ['bottomCenter'] }}
          />
          <Button
            type="primary"
            className={styles.addUsersBtn}
            onClick={() => setIsAddUserModalOpen(true)}
          >
            Add teammember
          </Button>
        </>
      )}

      {!isCultivationTeamDataLoading &&
        !cultivationTeamDataError &&
        cultivationTeamDataWithValidation?.length === 0 && (
          <>
            <div className={styles.emptyCultivationTeam}>
              Unfortunately, no team members were found for this Cultivation Team.
            </div>
            <Button
              type="primary"
              className={styles.addUsersBtn}
              onClick={() => setIsAddUserModalOpen(true)}
            >
              Add teammember
            </Button>
          </>
        )}

      <Modal
        className={styles.addUsersModal}
        title="Add Users To Cultivation Team"
        open={!!isAddUserModalOpen}
        onCancel={() => setIsAddUserModalOpen(false)}
        centered
        footer={null}
      >
        <AddUsersToCultivation
          setIsAddUserModalOpen={setIsAddUserModalOpen}
          cultivationTeamUserIds={cultivationTeamDataWithValidation.map(
            (cultivationTeam) => cultivationTeam.user.id
          )}
        />
      </Modal>
    </div>
  );
}
