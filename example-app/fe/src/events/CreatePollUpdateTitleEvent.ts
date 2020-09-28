import { EventType } from './IEvent';

export interface ICreatePollUpdateTitleEvent {
  type: EventType.CREATE_POLL_UPDATE_TITLE;
  title: string;
}

export const createPollUpdateTitleEvent = (title: string): ICreatePollUpdateTitleEvent => ({
  type: EventType.CREATE_POLL_UPDATE_TITLE,
  title,
});
