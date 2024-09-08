export interface UserInterface {
  id: number;
  name: string;
}

export interface UserInCultivationInterface {
  cultivation_id: string;
  role: {
    id: number;
    name: string;
  };
  user: UserInterface;
}

export interface CultivationRolesInterface {
  description: string;
  id: number;
  name: string;
}
