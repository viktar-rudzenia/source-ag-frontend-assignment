export interface UserInCultivationInterface {
  cultivation_id: string;
  role: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    name: string;
  };
}
