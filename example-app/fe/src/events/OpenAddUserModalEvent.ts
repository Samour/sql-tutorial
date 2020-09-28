import { EventType } from './IEvent';

export interface IOpenAddUserModalEvent {
  type: EventType.OPEN_ADD_USER_MODAL;
  open: boolean;
}

export const openAddUserModalEvent = (open: boolean): IOpenAddUserModalEvent => ({
  type: EventType.OPEN_ADD_USER_MODAL,
  open,
});
