import { EventType } from './IEvent';
import { PollViewMode } from '../models/state';

export interface IPollViewModeEvent {
  type: EventType.POLL_VIEW_MODE;
  viewMode: PollViewMode;
}

export const pollViewModeEvent = (viewMode: PollViewMode): IPollViewModeEvent => ({
  type: EventType.POLL_VIEW_MODE,
  viewMode,
});
