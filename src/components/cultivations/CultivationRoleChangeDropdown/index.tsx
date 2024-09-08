import axios from 'axios';
import { MouseEvent, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Modal, notification } from 'antd';
import { useParams } from 'next/navigation';
import { mutate } from 'swr';

import { CultivationRolesInterface } from '@/utils/interfaces';
import { ApiRoutes } from '@/utils/constants';

import styles from './index.module.scss';

export default function CultivationRoleChangeDropdown({
  cultivationRolesObj,
  roleId,
  user,
}: {
  cultivationRolesObj: { [key: string]: CultivationRolesInterface };
  roleId: number;
  user: { id: number; name: string };
}) {
  const [notificationApi, notificationApiContextHolder] = notification.useNotification();

  const { cultivationId }: { cultivationId: string } = useParams();
  const [cultivationRoleToChange, setCultivationRoleToChange] =
    useState<CultivationRolesInterface | null>(null);
  const [isChangeUserRoleLoading, setIsChangeUserRoleLoading] = useState(false);

  const handleDropdownChange = ({
    event,
    cultivationRole,
  }: {
    event: MouseEvent;
    cultivationRole: CultivationRolesInterface;
  }) => {
    event.preventDefault();
    if (roleId !== cultivationRole.id) {
      setCultivationRoleToChange(cultivationRole);
    }
  };

  const roleOptions = Object.values(cultivationRolesObj).map((cultivationRole) => ({
    label: (
      <a onClick={(e) => handleDropdownChange({ event: e, cultivationRole: cultivationRole })}>
        {cultivationRole.name}
      </a>
    ),
    key: cultivationRole.id,
  }));

  const handleChangeUserRole = async () => {
    setIsChangeUserRoleLoading(true);
    try {
      await axios.put(
        ApiRoutes.getChangeUserInCultivationApi({ cultivationId, userId: `${user.id}` }),
        {
          role: {
            id: roleId,
          },
        }
      );
      notificationApi.success({
        message: 'User Role Changed',
        description: `User role for ${user.name} has been changed successfully`,
      });

      mutate(ApiRoutes.getUsersInCultivationApi(cultivationId));
    } catch (err) {
      notificationApi.error({
        message: 'Error',
        description: 'Error occurred during changing user role',
      });
    }
    setIsChangeUserRoleLoading(false);
    setCultivationRoleToChange(null);
  };

  return (
    <>
      {notificationApiContextHolder}
      <Dropdown className={styles.dropdown} menu={{ items: roleOptions }} trigger={['click']}>
        <Button>
          {cultivationRolesObj[roleId].name} <DownOutlined />
        </Button>
      </Dropdown>
      <Modal
        title="Change Role"
        open={!!cultivationRoleToChange}
        onOk={handleChangeUserRole}
        onCancel={() => setCultivationRoleToChange(null)}
        centered
        okText="Change"
        okButtonProps={{ loading: isChangeUserRoleLoading }}
      >
        <div>
          Do you really want change role for {user.name} from {cultivationRolesObj[roleId].name} to{' '}
          {cultivationRoleToChange && cultivationRolesObj[cultivationRoleToChange.id].name}
        </div>
      </Modal>
    </>
  );
}
