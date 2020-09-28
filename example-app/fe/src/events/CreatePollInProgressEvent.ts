import { EventType } from './IEvent';

export interface ICreatePollInProgressEvent {
  type: EventType.CREATE_POLL_IN_PROGRESS;
  inProgress: boolean;
}

export const createPollInProgressEvent = (inProgress: boolean): ICreatePollInProgressEvent => ({
  type: EventType.CREATE_POLL_IN_PROGRESS,
  inProgress,
});
