import { EventType } from './IEvent';

export interface ICreatePollAddOptionEvent {
  type: EventType.CREATE_POLL_ADD_OPTION;
}

export const createPollAddOptionEvent = (): ICreatePollAddOptionEvent => ({
  type: EventType.CREATE_POLL_ADD_OPTION,
});
