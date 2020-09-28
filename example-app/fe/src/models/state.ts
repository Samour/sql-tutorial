import { ListItemResponse, UserPollEntry, PollUserAnswer, PollResultResponse, PollOptionResult } from './dtos';

export enum MainListContext {
  USERS = 'USERS',
  POLLS = 'POLLS',
}

export interface IMainListState {
  context: MainListContext;
  title: string;
  loading: boolean;
  items: ListItemResponse[];
}

export interface IAddUserModalState {
  open: boolean;
  submitInProgress: boolean;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IManageUserState {
  userId: string | undefined;
  firstName: string;
  lastName: string;
  polls: UserPollEntry[];
}

export interface IActiveUserState {
  activeUserId: string | undefined;
}

export interface ICreatePollModalState {
  open: boolean;
  title: string;
  options: string[];
  submitInProgress: boolean;
}

export enum PollViewMode {
  COUNT = 'COUNT',
  ALL = 'ALL',
}

export interface IViewPollState {
  pollId: string | undefined;
  voteModalOpen: boolean;
  title: string;
  viewMode: PollViewMode;
  results: PollOptionResult[];
  responses: PollUserAnswer[];
}

export interface IState {
  mainList: IMainListState;
  addUserModal: IAddUserModalState;
  manageUser: IManageUserState;
  activeUser: IActiveUserState;
  createPollModal: ICreatePollModalState;
  viewPoll: IViewPollState;
}
