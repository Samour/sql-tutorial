import { IAddUserModalState } from '../models/state';
import { IEvent, EventType } from '../events/IEvent';
import { IOpenAddUserModalEvent } from '../events/OpenAddUserModalEvent';
import { IUpdateAddUserFieldEvent } from '../events/UpdateAddUserFieldEvent';
import { IAddUserInProgressEvent } from '../events/AddUserInProgressEvent';

const defaultState: IAddUserModalState = {
  open: false,
  submitInProgress: false,
  email: '',
  firstName: '',
  lastName: '',
};

export default function (state: IAddUserModalState | undefined, event: IEvent): IAddUserModalState {
  state = state || defaultState;
  if (event.type === EventType.OPEN_ADD_USER_MODAL) {
    const { open } = event as IOpenAddUserModalEvent;
    return {
      ...state,
      open,
    };
  } else if (event.type === EventType.UPDATE_ADD_USER_FIELD) {
    const { field, value } = event as IUpdateAddUserFieldEvent;
    state = { ...state };
    state[field] = value;
    return state;
  } else if (event.type === EventType.RESET_ADD_USER_MODAL) {
    return defaultState;
  } else if (event.type === EventType.ADD_USER_IN_PROGRESS) {
    const { inProgress } = event as IAddUserInProgressEvent;
    return {
      ...state,
      submitInProgress: inProgress,
    };
  } else {
    return state;
  }
}
