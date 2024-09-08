export const PageRoutes = {
  HOME: '/',
  CULTIVATIONS: '/cultivations',
  getCultivationTeamRoute: (cultivationId: string) => PageRoutes.CULTIVATIONS + `/${cultivationId}`,
};

const API_URL = 'https://14dtv3lu9k.execute-api.eu-central-1.amazonaws.com';
const CULTIVATION_ID_TEXT = '<cultivation_id>';
const USER_ID_TEXT = '<user_id>';

export const ApiRoutes = {
  cultivations: `${API_URL}/cultivations`,
  users: `${API_URL}/users`,
  cultivationRoles: `${API_URL}/cultivation-roles`,
  usersInCultivationPattern: `${API_URL}/cultivations/${CULTIVATION_ID_TEXT}/users`,
  changeUserInCultivationPattern: `${API_URL}/cultivations/${CULTIVATION_ID_TEXT}/users/${USER_ID_TEXT}`,
  getUsersInCultivationApi: (cultivationId: string) =>
    ApiRoutes.usersInCultivationPattern.replace(CULTIVATION_ID_TEXT, cultivationId),
  getChangeUserInCultivationApi: ({
    cultivationId,
    userId,
  }: {
    cultivationId: string;
    userId: string;
  }) =>
    ApiRoutes.changeUserInCultivationPattern
      .replace(CULTIVATION_ID_TEXT, cultivationId)
      .replace(USER_ID_TEXT, userId),
};
