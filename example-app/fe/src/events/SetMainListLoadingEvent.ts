import { EventType } from './IEvent';

export interface ISetMainListLoadingEvent {
  type: EventType.SET_MAIN_LIST_LOADING;
  loading: boolean;
}

export const setMainListLoadingEvent = (loading: boolean): ISetMainListLoadingEvent => ({
  type: EventType.SET_MAIN_LIST_LOADING,
  loading,
});
