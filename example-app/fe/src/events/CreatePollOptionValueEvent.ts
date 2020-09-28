import { EventType } from './IEvent';

export interface ICreatePollOptionValueEvent {
  type: EventType.CREATE_POLL_OPTION_VALUE;
  option: number;
  value: string;
}

export const createPollOptionValueEvent = (option: number, value: string): ICreatePollOptionValueEvent => ({
  type: EventType.CREATE_POLL_OPTION_VALUE,
  option,
  value,
});
