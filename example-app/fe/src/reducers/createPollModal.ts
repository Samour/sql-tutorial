import { ICreatePollModalState } from '../models/state';
import { IEvent, EventType } from '../events/IEvent';
import { IOpenCreatePollModalEvent } from '../events/OpenCreatePollModalEvent';
import { ICreatePollRemoveOptionEvent } from '../events/CreatePollRemoveOptionEvent';
import { ICreatePollOptionValueEvent } from '../events/CreatePollOptionValueEvent';
import { ICreatePollInProgressEvent } from '../events/CreatePollInProgressEvent';
import { ICreatePollUpdateTitleEvent } from '../events/CreatePollUpdateTitleEvent';

const defaultState: ICreatePollModalState = {
  open: false,
  title: '',
  options: [''],
  submitInProgress: false,
};

export default function (state: ICreatePollModalState | undefined, event: IEvent): ICreatePollModalState {
  state = state || defaultState;
  if (event.type === EventType.OPEN_CREATE_POLL_MODAL) {
    const { open } = event as IOpenCreatePollModalEvent;
    return {
      ...state,
      open,
    };
  } else if (event.type === EventType.CREATE_POLL_UPDATE_TITLE) {
    const { title } = event as ICreatePollUpdateTitleEvent;
    return {
      ...state,
      title,
    };
  } else if (event.type === EventType.CREATE_POLL_ADD_OPTION) {
    return {
      ...state,
      options: state.options.concat(''),
    };
  } else if (event.type === EventType.CREATE_POLL_REMOVE_OPTION) {
    const { option } = event as ICreatePollRemoveOptionEvent;
    return {
      ...state,
      options: state.options.filter((o, i) => i !== option),
    };
  } else if (event.type === EventType.CREATE_POLL_OPTION_VALUE) {
    const { option, value } = event as ICreatePollOptionValueEvent;
    return {
      ...state,
      options: state.options.map((o, i) => i === option ? value : o),
    };
  } else if (event.type === EventType.CREATE_POLL_IN_PROGRESS) {
    const { inProgress } = event as ICreatePollInProgressEvent;
    return {
      ...state,
      submitInProgress: inProgress,
    };
  } else if (event.type === EventType.RESET_CREATE_POLL_MODAL) {
    return defaultState;
  } else {
    return state;
  }
}
