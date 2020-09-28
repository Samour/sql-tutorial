import { IViewPollState, PollViewMode } from '../models/state';
import { IEvent, EventType } from '../events/IEvent';
import { IOpenViewPollEvent } from '../events/OpenViewPollEvent';
import { IPollViewModeEvent } from '../events/PollViewModeEvent';
import { ISetPollResultsEvent } from '../events/SetPollResultsEvent';
import { ISetPollResponsesEvent } from '../events/SetPollResponsesEvent';
import { IOpenVoteModalEvent } from '../events/OpenVoteModalEvent';

const defaultState: IViewPollState = {
  pollId: undefined,
  voteModalOpen: false,
  title: '',
  viewMode: PollViewMode.COUNT,
  results: [],
  responses: [],
};

export default function (state: IViewPollState | undefined, event: IEvent): IViewPollState {
  state = state || defaultState;
  if (event.type === EventType.OPEN_VIEW_POLL) {
    const { pollId, title } = event as IOpenViewPollEvent;
    return {
      ...state,
      pollId,
      title,
    };
  } else if (event.type === EventType.OPEN_VOTE_MODAL) {
    const { open } = event as IOpenVoteModalEvent;
    return {
      ...state,
      voteModalOpen: open,
    };
  } else if (event.type === EventType.POLL_VIEW_MODE) {
    const { viewMode } = event as IPollViewModeEvent;
    return {
      ...state,
      viewMode,
    };
  } else if (event.type === EventType.SET_POLL_RESULTS) {
    const { results } = event as ISetPollResultsEvent;
    return {
      ...state,
      results,
    };
  } else if (event.type === EventType.SET_POLL_RESPONSES) {
    const { responses } = event as ISetPollResponsesEvent;
    return {
      ...state,
      responses,
    };
  } else if (event.type === EventType.CLEAR_VIEW_POLL || event.type === EventType.SET_MAIN_LIST_CONTEXT) {
    return defaultState;
  } else {
    return state || defaultState;
  }
}
