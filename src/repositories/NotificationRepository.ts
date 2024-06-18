import { INotificationCreationAttributes } from "models/notificationModel";
import { NotificationModel } from "../models";

class NotificationRepository {
  CreateNotification = async (reqModel: INotificationCreationAttributes) => {
    const record = await NotificationModel.create(reqModel);
    return record;
  };
}

export default NotificationRepository;
