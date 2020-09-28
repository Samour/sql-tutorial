import { EventType } from './IEvent';

export interface IOpenCreatePollModalEvent {
  type: EventType.OPEN_CREATE_POLL_MODAL;
  open: boolean;
}

export const openCreatePollModalEvent = (open: boolean): IOpenCreatePollModalEvent => ({
  type: EventType.OPEN_CREATE_POLL_MODAL,
  open,
});
