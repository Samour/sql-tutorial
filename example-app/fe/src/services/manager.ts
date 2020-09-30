import { Store } from 'redux';
import { IState } from '../models/state';
import { memo } from '../utils/singleton';
import { ApiService, IApiService } from './ApiService';
import { IMainViewService, MainViewService } from './MainViewService';
import { IPollsService, PollsService } from './PollsService';
import { IUsersService, UsersService } from './UsersService';

class ServicesManager {

  private static instance?: ServicesManager;

  private constructor(private readonly store: Store<IState>) { }

  public static initialise(store: Store<IState>): ServicesManager {
    ServicesManager.instance = new ServicesManager(store);
    return ServicesManager.getInstance();
  }

  public static getInstance(): ServicesManager {
    if (!ServicesManager.instance) {
      throw new Error('ServicesManager not initialised');
    }
    return ServicesManager.instance;
  }

  public getApiService: () => IApiService = memo(() => {
    return new ApiService();
  });

  public getUsersService: () => IUsersService = memo(() => {
    return new UsersService(this.store, this.getApiService());
  });

  public getPollsService: () => IPollsService = memo(() => {
    return new PollsService(this.store, this.getApiService());
  });

  public getMainViewService: () => IMainViewService = memo(() => {
    return new MainViewService(this.store, this.getUsersService(), this.getPollsService());
  });
}

export const initialise = (store: Store<IState>): ServicesManager => ServicesManager.initialise(store);

export const getManager = (): ServicesManager => ServicesManager.getInstance();
