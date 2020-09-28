import { ListItemResponse } from '../models/dtos';
import { EventType } from './IEvent';

export interface ISetMainListDataEvent {
  type: EventType.SET_MAIN_LIST_DATA;
  items: ListItemResponse[];
}

export const setMainListDataEvent = (items: ListItemResponse[]): ISetMainListDataEvent => ({
  type: EventType.SET_MAIN_LIST_DATA,
  items,
});
