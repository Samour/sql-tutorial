import { EventType } from './IEvent';

export interface ISetActiveUserEvent {
  type: EventType.SET_ACTIVE_USER;
  activeUserId: string;
}

export const setActiveUserEvent = (activeUserId: string): ISetActiveUserEvent => ({
  type: EventType.SET_ACTIVE_USER,
  activeUserId,
});
