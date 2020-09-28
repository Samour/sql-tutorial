import * as express from 'express';
import { v4 as uuid } from 'uuid';
import { routeBridge } from '../routeBridge';
import database from '../database';
import { UserDb, UserPollResponseDb } from '../models/db';
import { ListResponse, UserListItem, CreateUserRequest, CreateUserResponse, UserPollsResponse } from '../models/dtos';

const ALL_USERS_QUERY = 'SELECT * FROM User;';

const INSERT_USER_QUERY = 'INSERT INTO User (id, email, first_name, last_name, sign_up_date) VALUES (?, ?, ?, ?, ?);';

const DELETE_QUERY = 'DELETE FROM User WHERE id = ?';

const USER_POLLS_QUERY = 'SELECT poll.id AS poll_id, poll.title, opt.id AS option_id, opt.option ' +
  'FROM PollResponse AS response ' +
  'JOIN Poll ON response.poll_id = poll.id ' +
  'JOIN PollOption AS opt ON response.response_id = opt.id ' +
  'WHERE response.user_id = ?;';

const users: express.Router = express.Router();

users.get('/', routeBridge(async (): Promise<ListResponse<UserListItem>> => {
  const users: UserDb[] = await database.executeQuery(ALL_USERS_QUERY);
  return {
    items: users.map((u) => ({
      id: u.id,
      displayTitle: `${u.first_name} ${u.last_name}`,
      email: u.email,
      firstName: u.first_name,
      lastName: u.last_name,
    })),
  };
}));

users.post('/', routeBridge(async (req): Promise<CreateUserResponse> => {
  const { email, firstName, lastName }: CreateUserRequest = req.body;
  const id = uuid();
  const signUpDate = new Date();
  await database.executeQuery(INSERT_USER_QUERY, [id, email, firstName, lastName, signUpDate]);

  return {
    id,
    email,
    firstName,
    lastName,
    signUpDate,
  };
}));

users.delete('/:userId', routeBridge(async (req): Promise<void> => {
  await database.executeQuery(DELETE_QUERY, [req.params.userId]);
}));

users.get('/:userId/pollResponses', routeBridge(async (req): Promise<UserPollsResponse> => {
  const rows: UserPollResponseDb[] = await database.executeQuery(USER_POLLS_QUERY, [req.params.userId]);
  return {
    polls: rows.map((r) => ({
      poll: {
        id: r.poll_id,
        title: r.title,
      },
      option: {
        id: r.option_id,
        title: r.option,
      },
    })),
  };
}));

export default users;
