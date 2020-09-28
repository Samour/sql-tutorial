import { Store } from 'redux';
import { IState, MainListContext } from '../models/state';
import { setMainListLoadingEvent } from '../events/SetMainListLoadingEvent';
import { setMainListContextEvent } from '../events/SetMainListContextEvent';
import { setMainListDataEvent } from '../events/SetMainListDataEvent';
import { addUserInProgressEvent } from '../events/AddUserInProgressEvent';
import { resetAddUserModalEvent } from '../events/ResetAddUserModalEvent';
import { store } from '../store';
import { IApiService, apiService } from './ApiService';
import { populateUserPollsEvent } from '../events/PopulateUserPollsEvent';

export interface IUsersService {
  openUsersList(): Promise<void>;

  submitNewUser(): () => void;

  deleteUser(id: string): () => void;

  loadPollResponses(id: string): Promise<void>;
}

class UsersService implements IUsersService {

  constructor(private readonly store: Store<IState>, private readonly apiService: IApiService) { }

  async openUsersList(): Promise<void> {
    this.store.dispatch(setMainListLoadingEvent(true));
    this.store.dispatch(setMainListContextEvent(MainListContext.USERS));

    const usersResponse = await this.apiService.getAllUsers();
    this.store.dispatch(setMainListDataEvent(usersResponse.items));
    this.store.dispatch(setMainListLoadingEvent(false));
  }

  private async submitNewUserAsync(): Promise<void> {
    this.store.dispatch(addUserInProgressEvent(true));
    const { email, firstName, lastName } = this.store.getState().addUserModal;
    await this.apiService.createUser({ email, firstName, lastName });
    this.store.dispatch(resetAddUserModalEvent());
    await this.openUsersList();
  }

  submitNewUser(): () => void {
    return () => this.submitNewUserAsync();
  }

  private async deleteUserAsync(id: string): Promise<void> {
    await this.apiService.deleteUser(id);
    await this.openUsersList();
  }

  deleteUser(id: string): () => void {
    return () => this.deleteUserAsync(id);
  }

  async loadPollResponses(id: string): Promise<void> {
    const { polls } = await this.apiService.getUserPollResponses(id);
    this.store.dispatch(populateUserPollsEvent(polls));
  }
}

export const usersService: IUsersService = new UsersService(store, apiService);
