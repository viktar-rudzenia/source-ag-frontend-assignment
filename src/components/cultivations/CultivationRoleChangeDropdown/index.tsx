import { MouseEvent, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Modal } from 'antd';

import { CultivationRolesInterface } from '@/utils/interfaces';

import styles from './index.module.scss';

export default function CultivationRoleChangeDropdown({
  cultivationRolesObj,
  roleId,
}: {
  cultivationRolesObj: { [key: string]: CultivationRolesInterface };
  roleId: number;
}) {
  const [cultivationRoleToChange, setCultivationRoleToChange] =
    useState<CultivationRolesInterface | null>(null);

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

  const handleChangeUserRole = () => {
    setCultivationRoleToChange(null);
  };

  return (
    <>
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
      >
        <div>
          Do you really want change role from {cultivationRolesObj[roleId].name} to{' '}
          {cultivationRoleToChange && cultivationRolesObj[cultivationRoleToChange.id].name}
        </div>
      </Modal>
    </>
  );
}
