import { EventType } from './IEvent';

export interface IAddUserInProgressEvent {
  type: EventType.ADD_USER_IN_PROGRESS;
  inProgress: boolean;
}

export const addUserInProgressEvent = (inProgress: boolean): IAddUserInProgressEvent => ({
  type: EventType.ADD_USER_IN_PROGRESS,
  inProgress,
});
