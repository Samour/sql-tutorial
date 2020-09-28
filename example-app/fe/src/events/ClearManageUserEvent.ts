import { EventType } from './IEvent';

export interface IClearManageUserEvent {
  type: EventType.CLEAR_MANAGE_USER;
}

export const clearManageUserEvent = (): IClearManageUserEvent => ({
  type: EventType.CLEAR_MANAGE_USER,
});
