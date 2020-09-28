import { IMainListState, MainListContext } from '../models/state';
import { IEvent, EventType } from '../events/IEvent';
import { ISetMainListContextEvent } from '../events/SetMainListContextEvent';
import { ISetMainListLoadingEvent } from '../events/SetMainListLoadingEvent';
import { ISetMainListDataEvent } from '../events/SetMainListDataEvent';

const defaultState: IMainListState = {
  context: MainListContext.USERS,
  title: 'Users',
  loading: true,
  items: [],
};

function getTitle(context: MainListContext): string {
  switch (context) {
    case MainListContext.USERS:
      return 'Users';
    case MainListContext.POLLS:
      return 'Polls';
    default:
      return '';
  }
}

export default function (state: IMainListState | undefined, event: IEvent): IMainListState {
  state = state || defaultState;
  if (event.type === EventType.SET_MAIN_LIST_CONTEXT) {
    const { context } = event as ISetMainListContextEvent;
    return {
      ...state,
      context,
      title: getTitle(context),
    };
  } else if (event.type === EventType.SET_MAIN_LIST_LOADING) {
    const { loading } = event as ISetMainListLoadingEvent;
    return {
      ...state,
      loading,
    };
  } else if (event.type === EventType.SET_MAIN_LIST_DATA) {
    const { items } = event as ISetMainListDataEvent;
    return {
      ...state,
      items,
    };
  } else {
    return state;
  }
}
