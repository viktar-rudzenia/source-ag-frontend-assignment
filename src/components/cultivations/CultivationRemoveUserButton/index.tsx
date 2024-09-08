'use client';

import { useState } from 'react';
import { Button, Modal, notification } from 'antd';

import { UserInterface } from '@/utils/interfaces';
import { mutate } from 'swr';
import { ApiRoutes } from '@/utils/constants';
import axios from 'axios';

export default function CultivationRemoveUserButton({
  cultivationId,
  user,
}: {
  cultivationId: string;
  user: UserInterface;
}) {
  const [isRemoveUserLoading, setIsRemoveUserLoading] = useState(false);
  const [cultivationUserToRemove, setCultivationUserToRemove] = useState<UserInterface | null>(
    null
  );
  const [notificationApi, notificationApiContextHolder] = notification.useNotification();

  const handleRemoveUserFromCultivation = async () => {
    setIsRemoveUserLoading(true);
    try {
      await axios.delete(
        ApiRoutes.getChangeUserInCultivationApi({ cultivationId, userId: `${user.id}` })
      );
      notificationApi.success({
        message: 'User Removed',
        description: `${user.name} has been removed successfully from Cultivation Team`,
      });

      mutate(ApiRoutes.getUsersInCultivationApi(cultivationId));
    } catch (err) {
      notificationApi.error({
        message: 'Error',
        description: `Error occurred during removing ${user.name} from Cultivation Team`,
      });
    }
    setIsRemoveUserLoading(false);
    setCultivationUserToRemove(null);
  };

  return (
    <>
      {notificationApiContextHolder}

      <Button onClick={() => setCultivationUserToRemove(user)} type="primary" danger>
        Remove
      </Button>

      <Modal
        title="Remove user"
        open={!!cultivationUserToRemove}
        onOk={handleRemoveUserFromCultivation}
        onCancel={() => setCultivationUserToRemove(null)}
        okText="Remove"
        okButtonProps={{ loading: isRemoveUserLoading, danger: true }}
        centered
      >
        <div>Do you really want to remove {user.name} from Cultivation Team?</div>
      </Modal>
    </>
  );
}
