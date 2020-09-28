import { EventType } from './IEvent';

type FieldName = 'email' | 'firstName' | 'lastName';

export interface IUpdateAddUserFieldEvent {
  type: EventType.UPDATE_ADD_USER_FIELD;
  field: FieldName
  value: string;
}

export const updateAddUserFieldEvent = (field: FieldName, value: string): IUpdateAddUserFieldEvent => ({
  type: EventType.UPDATE_ADD_USER_FIELD,
  field,
  value,
});
