import * as express from 'express';
import { v4 as uuid } from 'uuid';
import { routeBridge } from '../routeBridge';
import { PollDb, PollResponseDb, PollResultDb } from '../models/db';
import {
  ListResponse,
  PollListItem,
  CreatePollRequest,
  PollResultResponse,
  PollAnswersResponse,
  CastVoteRequest,
} from '../models/dtos';
import database, { DbValue } from '../database';

const ALL_POLLS_QUERY = 'SELECT * FROM Poll';

const CREATE_POLL_QUERY = 'INSERT INTO Poll (id, owner_user_id, title) VALUES (?, ?, ?);';

const DELETE_POLL_QUERY = 'DELETE FROM Poll WHERE id = ?;';
const DELETE_POLL_OPTION_QUERY = 'DELETE FROM PollOption WHERE poll_id = ?;';
const DELETE_POLL_RESPONSE_QUERY = 'DELETE FROM PollResponse WHERE poll_id = ?;';

const POLL_RESPONSES_QUERY = 'SELECT user.id as user_id, user.first_name, user.last_name, opt.id as option_id, ' +
  'opt.option ' +
  'FROM PollResponse ' +
  'JOIN PollOption AS opt ON PollResponse.response_id = opt.id ' +
  'JOIN User ON PollResponse.user_id = user.id ' +
  'WHERE PollResponse.poll_id = ? ' +
  'ORDER BY opt.order, user.first_name;';

const POLL_RESULT_QUERY = 'SELECT opt.id as option_id, opt.option, count(response.response_id) as count ' +
  'FROM PollOption AS opt ' +
  'LEFT JOIN PollResponse AS response ON opt.id = response.response_id ' +
  'WHERE opt.poll_id = ? ' +
  'GROUP BY opt.id ' +
  'ORDER BY opt.order;';

const CREATE_RESPONSE_QUERY = 'INSERT INTO PollResponse (poll_id, user_id, response_id, response_time) ' +
  'VALUES (?, ?, ?, ?);';

const createPollOptionsQuery = (rowCount: number): string => {
  const rows: string[] = [];
  while (rows.length < rowCount) {
    rows.push('(?, ?, ?, ?)');
  }

  return `INSERT INTO PollOption (id, poll_id, \`option\`, \`order\`) VALUES ${rows.join(', ')};`;
};

const polls: express.Router = express.Router();

polls.get('/', routeBridge(async (): Promise<ListResponse<PollListItem>> => {
  const polls: PollDb[] = await database.executeQuery(ALL_POLLS_QUERY);
  return {
    items: polls.map((p) => ({
      id: p.id,
      displayTitle: p.title,
    })),
  };
}));

polls.post('/', routeBridge(async (req): Promise<void> => {
  const poll: CreatePollRequest = req.body;
  const pollId = uuid();
  await database.executeQuery(CREATE_POLL_QUERY, [pollId, poll.userId, poll.title]);
  const optionQueryValues: DbValue[] = poll.responses.map((r, i) => [uuid(), pollId, r, i])
    .reduce((l, a) => l.concat(a), []);
  await database.executeQuery(createPollOptionsQuery(poll.responses.length), optionQueryValues);
}));

polls.delete('/:pollId', routeBridge(async (req): Promise<void> => {
  await database.executeQuery(DELETE_POLL_RESPONSE_QUERY, [req.params.pollId]);
  await database.executeQuery(DELETE_POLL_OPTION_QUERY, [req.params.pollId]);
  await database.executeQuery(DELETE_POLL_QUERY, [req.params.pollId]);
}));

polls.get('/:pollId/responses', routeBridge(async (req): Promise<PollAnswersResponse> => {
  const responses: PollResponseDb[] = await database.executeQuery(POLL_RESPONSES_QUERY, [req.params.pollId]);
  return {
    answers: responses.map((r) => ({
      user: {
        id: r.user_id,
        firstName: r.first_name,
        lastName: r.last_name,
      },
      option: {
        id: r.option_id,
        title: r.option,
      },
    })),
  };
}));

polls.get('/:pollId/responses/count', routeBridge(async (req): Promise<PollResultResponse> => {
  const options: PollResultDb[] = await database.executeQuery(POLL_RESULT_QUERY, [req.params.pollId]);
  return {
    options: options.map((o) => ({
      option: {
        id: o.option_id,
        title: o.option,
      },
      count: o.count,
    })),
  };
}));

polls.post('/:pollId/vote', routeBridge(async (req): Promise<void> => {
  const vote: CastVoteRequest = req.body;
  await database.executeQuery(CREATE_RESPONSE_QUERY, [req.params.pollId, vote.userId, vote.optionId, new Date()]);
}));

export default polls;
