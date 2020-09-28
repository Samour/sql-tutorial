import { EventType } from './IEvent';
import { PollOptionResult } from '../models/dtos';

export interface ISetPollResultsEvent {
  type: EventType.SET_POLL_RESULTS;
  results: PollOptionResult[];
}

export const setPollResultsEvent = (results: PollOptionResult[]): ISetPollResultsEvent => ({
  type: EventType.SET_POLL_RESULTS,
  results,
});
