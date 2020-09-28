import { MainListContext } from '../models/state';
import { EventType } from './IEvent';

export interface ISetMainListContextEvent {
  type: EventType.SET_MAIN_LIST_CONTEXT;
  context: MainListContext;
}

export const setMainListContextEvent = (context: MainListContext): ISetMainListContextEvent => ({
  type: EventType.SET_MAIN_LIST_CONTEXT,
  context,
});
