import { IActiveUserState } from '../models/state';
import { IEvent, EventType } from '../events/IEvent';
import { ISetActiveUserEvent } from '../events/SetActiveUserEvent';

const defaultState: IActiveUserState = {
  activeUserId: undefined,
};

export default function (state: IActiveUserState | undefined, event: IEvent): IActiveUserState {
  state = state || defaultState;
  if (event.type === EventType.SET_ACTIVE_USER) {
    const { activeUserId } = event as ISetActiveUserEvent;
    return {
      ...state,
      activeUserId,
    };
  } else {
    return state;
  }
}
