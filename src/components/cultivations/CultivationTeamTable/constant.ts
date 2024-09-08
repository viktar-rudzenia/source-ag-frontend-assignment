import { UserInCultivationInterface } from '@/utils/interfaces';

export const rowSelectionForCultivationTeam = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: UserInCultivationInterface[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};
