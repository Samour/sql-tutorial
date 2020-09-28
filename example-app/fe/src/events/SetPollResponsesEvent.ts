import { EventType } from './IEvent';
import { PollUserAnswer } from '../models/dtos';

export interface ISetPollResponsesEvent {
  type: EventType.SET_POLL_RESPONSES;
  responses: PollUserAnswer[];
}

export const setPollResponsesEvent = (responses: PollUserAnswer[]): ISetPollResponsesEvent => ({
  type: EventType.SET_POLL_RESPONSES,
  responses,
});
