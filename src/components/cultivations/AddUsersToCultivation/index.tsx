'use client';

import { useEffect, useState } from 'react';
import { Button, Input, Result, Spin, Table, TableColumnsType, TableProps } from 'antd';
import useSWR from 'swr';

import { fetcher } from '@/utils/fetcher';
import { ApiRoutes } from '@/utils/constants';
import { UserInterface } from '@/utils/interfaces';

import styles from './index.module.scss';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

export default function AddUsersToCultivation({
  setIsAddUserModalOpen,
}: {
  setIsAddUserModalOpen: (value: boolean) => void;
}) {
  const [searchUser, setSearchUser] = useState<string>('');
  const [usersDataWithAppliedSearch, setUsersDataWithAppliedSearch] = useState<UserInterface[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<UserInterface> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className={styles.wrapper}>
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
            onChange={handleSearchUser}
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
          <Button
            disabled={!hasSelected}
            type="primary"
            onClick={() => setIsAddUserModalOpen(false)}
          >
            Add to cultivation team {hasSelected && `${selectedRowKeys.length} users`}
          </Button>
        </>
      )}

      {!isUsersDataLoading && !userDataError && usersData?.length === 0 && (
        <div className={styles.emptyData}>Unfortunately, no Users were found.</div>
      )}
    </div>
  );
}
