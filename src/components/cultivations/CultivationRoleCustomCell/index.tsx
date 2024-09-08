import { CultivationRolesInterface } from '@/utils/interfaces';

export default function CultivationRoleColumnCell({
  cultivationRolesObj,
  roleId,
}: {
  cultivationRolesObj: { [key: string]: CultivationRolesInterface };
  roleId: number;
}) {
  return <div>{cultivationRolesObj[roleId]?.name}</div>;
}
