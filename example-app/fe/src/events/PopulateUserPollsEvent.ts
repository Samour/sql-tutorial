import { EventType } from './IEvent';
import { UserPollEntry } from '../models/dtos';

export interface IPopulateUserPollsEvent {
  type: EventType.POPULATE_USER_POLLS;
  polls: UserPollEntry[];
}

export const populateUserPollsEvent = (polls: UserPollEntry[]): IPopulateUserPollsEvent => ({
  type: EventType.POPULATE_USER_POLLS,
  polls,
});
