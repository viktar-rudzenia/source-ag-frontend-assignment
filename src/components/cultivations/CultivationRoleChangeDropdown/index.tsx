import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';

import { CultivationRolesInterface } from '@/utils/interfaces';

import styles from './index.module.scss';

export default function CultivationRoleChangeDropdown({
  cultivationRolesObj,
  roleId,
}: {
  cultivationRolesObj: { [key: string]: CultivationRolesInterface };
  roleId: number;
}) {
  const roleOptions = [
    {
      label: '1st menu item',
      key: '0',
    },
    {
      label: '2nd menu item',
      key: '1',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];
  return (
    <Dropdown className={styles.dropdown} menu={{ items: roleOptions }} trigger={['click']}>
      <Button>
        {cultivationRolesObj[roleId].name} <DownOutlined />
      </Button>
    </Dropdown>
  );
}
