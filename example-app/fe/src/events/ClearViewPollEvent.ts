import { EventType } from './IEvent';

export interface IClearViewPollEvent {
  type: EventType.CLEAR_VIEW_POLL;
}

export const clearViewPollEvent = (): IClearViewPollEvent => ({
  type: EventType.CLEAR_VIEW_POLL,
});
