import { EventType } from '../events/IEvent';

export interface IOpenViewPollEvent {
  type: EventType.OPEN_VIEW_POLL;
  pollId: string;
  title: string;
}

export const openViewPollEvent = (pollId: string, title: string): IOpenViewPollEvent => ({
  type: EventType.OPEN_VIEW_POLL,
  pollId,
  title,
});
