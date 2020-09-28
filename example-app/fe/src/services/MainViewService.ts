import { Store } from 'redux';
import { IState, MainListContext } from '../models/state';
import { store } from '../store';
import { IUsersService, usersService } from './UsersService';
import { IPollsService, pollsService } from './PollsService';
import { openAddUserModalEvent } from '../events/OpenAddUserModalEvent';
import { openManageUserEvent } from '../events/OpenManageUserEvent';
import { openCreatePollModalEvent } from '../events/OpenCreatePollModalEvent';
import { openViewPollEvent } from '../events/OpenViewPollEvent';
import { ListItemResponse, UserListItem, PollListItem } from '../models/dtos';

export interface IMainViewService {
  navigateMenu(context: MainListContext): () => void;

  openAddModal(): () => void;

  openItemDetail(index: number): () => void;
}

class MainViewService implements IMainViewService {

  constructor(private readonly store: Store<IState>, private readonly usersService: IUsersService,
    private readonly pollsService: IPollsService) { }

  navigateMenu(context: MainListContext): () => void {
    if (context === MainListContext.USERS) {
      return () => this.usersService.openUsersList();
    } else if (context === MainListContext.POLLS) {
      return () => this.pollsService.openPollsList();
    } else {
      return () => { };
    }
  }

  openAddModal(): () => void {
    return () => {
      const { context } = this.store.getState().mainList;
      if (context === MainListContext.USERS) {
        this.store.dispatch(openAddUserModalEvent(true));
      } else if (context === MainListContext.POLLS) {
        this.store.dispatch(openCreatePollModalEvent(true));
      }
    };
  }

  openItemDetail(index: number): () => void {
    return () => {
      const { context } = this.store.getState().mainList;
      const selectedItem: ListItemResponse = this.store.getState().mainList.items[index];
      if (context === MainListContext.USERS) {
        const { id, firstName, lastName } = selectedItem as UserListItem;
        this.store.dispatch(openManageUserEvent(id, firstName, lastName));
      } else if (context === MainListContext.POLLS) {
        const { id, displayTitle } = selectedItem as PollListItem;
        this.store.dispatch(openViewPollEvent(id, displayTitle));
      }
    };
  }
}

export const mainViewService: IMainViewService = new MainViewService(store, usersService, pollsService);
