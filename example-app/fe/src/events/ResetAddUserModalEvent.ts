import { EventType } from './IEvent';

export interface IResetAddUserModalEvent {
  type: EventType.RESET_ADD_USER_MODAL;
}

export const resetAddUserModalEvent = (): IResetAddUserModalEvent => ({
  type: EventType.RESET_ADD_USER_MODAL,
});
