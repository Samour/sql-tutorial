import { IManageUserState } from '../models/state';
import { IEvent, EventType } from '../events/IEvent';
import { IOpenManageUserEvent } from '../events/OpenManageUserEvent';
import { IPopulateUserPollsEvent } from '../events/PopulateUserPollsEvent';

const defaultState: IManageUserState = {
  userId: undefined,
  firstName: '',
  lastName: '',
  polls: [],
};

export default function (state: IManageUserState | undefined, event: IEvent): IManageUserState {
  state = state || defaultState;
  if (event.type === EventType.OPEN_MANAGE_USER) {
    const { userId, firstName, lastName } = event as IOpenManageUserEvent;
    return {
      ...state,
      userId,
      firstName,
      lastName,
    };
  } else if (event.type === EventType.POPULATE_USER_POLLS) {
    const { polls } = event as IPopulateUserPollsEvent;
    return {
      ...state,
      polls,
    };
  } else if (event.type === EventType.CLEAR_MANAGE_USER || event.type === EventType.SET_MAIN_LIST_CONTEXT) {
    return defaultState;
  } else {
    return state;
  }
}
