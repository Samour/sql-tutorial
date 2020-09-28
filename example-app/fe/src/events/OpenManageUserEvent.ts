import { EventType } from './IEvent';

export interface IOpenManageUserEvent {
  type: EventType.OPEN_MANAGE_USER;
  userId: string;
  firstName: string;
  lastName: string;
}

export const openManageUserEvent = (userId: string, firstName: string, lastName: string): IOpenManageUserEvent => ({
  type: EventType.OPEN_MANAGE_USER,
  userId,
  firstName,
  lastName,
});
