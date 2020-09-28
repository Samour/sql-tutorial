import { EventType } from './IEvent';

export interface ICreatePollRemoveOptionEvent {
  type: EventType.CREATE_POLL_REMOVE_OPTION;
  option: number;
}

export const createPollRemoveOptionEvent = (option: number): ICreatePollRemoveOptionEvent => ({
  type: EventType.CREATE_POLL_REMOVE_OPTION,
  option,
});
