import { EventType } from './IEvent';

export interface IOpenVoteModalEvent {
  type: EventType.OPEN_VOTE_MODAL;
  open: boolean;
}

export const openVoteModalEvent = (open: boolean): IOpenVoteModalEvent => ({
  type: EventType.OPEN_VOTE_MODAL,
  open,
});
