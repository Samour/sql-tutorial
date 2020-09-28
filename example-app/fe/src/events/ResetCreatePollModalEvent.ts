import { EventType } from './IEvent';

export interface IResetCreatePollModalEvent {
  type: EventType.RESET_CREATE_POLL_MODAL;
}

export const resetCreatePollModalEvent = (): IResetCreatePollModalEvent => ({
  type: EventType.RESET_CREATE_POLL_MODAL,
});
