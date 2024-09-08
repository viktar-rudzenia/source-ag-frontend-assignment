'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Result,
  Spin,
  Table,
  TableColumnsType,
  TableProps,
  notification,
} from 'antd';
import useSWR, { mutate } from 'swr';
import { useParams } from 'next/navigation';
import axios from 'axios';

import { fetcher } from '@/utils/fetcher';
import { ApiRoutes } from '@/utils/constants';
import { UserInterface } from '@/utils/interfaces';

import styles from './index.module.scss';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
enum AddUsersRequestType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export default function AddUsersToCultivation({
  setIsAddUserModalOpen,
}: {
  setIsAddUserModalOpen: (value: boolean) => void;
}) {
  const { cultivationId }: { cultivationId: string } = useParams();

  const [notificationApi, notificationApiContextHolder] = notification.useNotification();
  const [searchUser, setSearchUser] = useState<string>('');
  const [usersDataWithAppliedSearch, setUsersDataWithAppliedSearch] = useState<UserInterface[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isAddOneUserModalOpen, setIsAddOneUserModalOpen] = useState<boolean>(false);
  const [isMultipleUsersModalOpen, setIsMultipleUsersModalOpen] = useState<boolean>(false);
  const [isAddUsersToCultivationLoading, setIsAddUsersToCultivationLoading] =
    useState<boolean>(false);

  const {
    data: usersData,
    isLoading: isUsersDataLoading,
    error: userDataError,
    mutate: mutateUsersData,
  } = useSWR<UserInterface[]>(ApiRoutes.users, fetcher);

  useEffect(() => {
    const filteredUsersData =
      usersData?.filter(({ name }) => name.toLowerCase().includes(searchUser.toLowerCase())) || [];

    setUsersDataWithAppliedSearch(filteredUsersData);
  }, [searchUser, usersData]);

  const addUsersColumns: TableColumnsType<UserInterface> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, { name }) => name,
    },
  ];

  const rowSelection: TableRowSelection<UserInterface> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => setSelectedRowKeys(newSelectedRowKeys),
  };

  const hasUsersSelected = selectedRowKeys.length > 0;

  const handleAddUsersToCultivationTeam = async ({ type }: { type: AddUsersRequestType }) => {
    setIsAddUsersToCultivationLoading(true);
    try {
      await axios.post(
        ApiRoutes.getUsersInCultivationApi(cultivationId),
        type === AddUsersRequestType.SINGLE
          ? {
              role: { id: 3 },
              user: { id: selectedRowKeys[0] },
            }
          : [selectedRowKeys.map((userId) => ({ role: { id: 3 }, user: { id: userId } }))]
      );
      notificationApi.success({
        message: type === AddUsersRequestType.SINGLE ? 'User added' : 'Users Added',
        description:
          type === AddUsersRequestType.SINGLE
            ? 'User has been successfully added to Cultivation Team'
            : `${selectedRowKeys.length} Users has been successfully added to Cultivation Team`,
      });

      mutate(ApiRoutes.getUsersInCultivationApi(cultivationId));
      setIsAddUserModalOpen(false);
      setSelectedRowKeys([]);
    } catch (err) {
      notificationApi.error({
        message: 'Error',
        description:
          type === AddUsersRequestType.SINGLE
            ? 'An error occurred while adding the user to the Cultivation team'
            : `Error occurred during adding ${selectedRowKeys.length} Users to Cultivation Team`,
      });
    }
    setIsAddUsersToCultivationLoading(false);
    type === AddUsersRequestType.SINGLE
      ? setIsAddOneUserModalOpen(false)
      : setIsMultipleUsersModalOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      {notificationApiContextHolder}
      {isUsersDataLoading && <Spin size="large" />}

      {!isUsersDataLoading && userDataError && (
        <Result
          status="warning"
          title={
            <div>An error occurred, please try downloading Users again or refreshing the page</div>
          }
          extra={
            <>
              <Button onClick={() => mutateUsersData()}>Download Users again</Button>
              <span>or</span>
              <Button onClick={() => window.location.reload()}>Refresh the page</Button>
            </>
          }
        />
      )}

      {usersData && usersData.length > 0 && (
        <>
          <Input.Search
            enterButton
            value={searchUser}
            placeholder="Search teammember"
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <Table
            rowKey="id"
            className={styles.table}
            columns={addUsersColumns}
            dataSource={usersDataWithAppliedSearch}
            pagination={{
              position: ['bottomCenter'],
              defaultPageSize: 10,
              pageSizeOptions: [1, 5, 10],
            }}
            rowSelection={rowSelection}
          />
          <div className={styles.actionBtns}>
            <Button disabled={!hasUsersSelected} onClick={() => setSelectedRowKeys([])}>
              Reset Selection
            </Button>
            <Button
              disabled={!hasUsersSelected}
              type="primary"
              onClick={() => setIsMultipleUsersModalOpen(true)}
            >
              (API NEED TO BE UPDATED) Add multiple users:{' '}
              {hasUsersSelected && `${selectedRowKeys.length} users`}
            </Button>
            <Button
              disabled={!hasUsersSelected}
              type="primary"
              onClick={() => setIsAddOneUserModalOpen(true)}
            >
              Add 1 user to cultivation team, first selected
            </Button>
          </div>
        </>
      )}

      {!isUsersDataLoading && !userDataError && usersData?.length === 0 && (
        <div className={styles.emptyData}>Unfortunately, no Users were found.</div>
      )}

      <Modal
        title="Add Users to Cultivation Team"
        open={!!isMultipleUsersModalOpen}
        onOk={() => handleAddUsersToCultivationTeam({ type: AddUsersRequestType.MULTIPLE })}
        onCancel={() => setIsMultipleUsersModalOpen(false)}
        okText="Add users"
        centered
        okButtonProps={{ loading: isAddUsersToCultivationLoading }}
      >
        <div>Do you really want to add {selectedRowKeys.length} Users to Cultivation Team?</div>
      </Modal>

      <Modal
        title="Add User to Cultivation Team"
        open={!!isAddOneUserModalOpen}
        onOk={() => handleAddUsersToCultivationTeam({ type: AddUsersRequestType.SINGLE })}
        onCancel={() => setIsAddOneUserModalOpen(false)}
        okText="Add 1 user"
        centered
        okButtonProps={{ loading: isAddUsersToCultivationLoading }}
      >
        <div>Do you really want to add 1 User to Cultivation Team?</div>
      </Modal>
    </div>
  );
}
