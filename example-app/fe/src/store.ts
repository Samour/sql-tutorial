import { createStore, combineReducers, Store } from 'redux';
import { IState } from './models/state';
import mainList from './reducers/mainList';
import addUserModal from './reducers/addUserModal';
import manageUser from './reducers/manageUser';
import activeUser from './reducers/activeUser';
import createPollModal from './reducers/createPollModal';
import viewPoll from './reducers/viewPoll';

export const store: Store<IState> = createStore(combineReducers<IState>({
  mainList,
  addUserModal,
  manageUser,
  activeUser,
  createPollModal,
  viewPoll,
}));
