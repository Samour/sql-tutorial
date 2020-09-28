import {
  ListResponse,
  UserListItem,
  PollListItem,
  CreateUserRequest,
  UserPollsResponse,
  CreatePollRequest,
  PollAnswersResponse,
  PollResultResponse,
  CastVoteRequest,
} from '../models/dtos';
import { IConfig } from '../models/config';

export interface IApiService {
  getConfig(): Promise<IConfig>;

  getAllUsers(): Promise<ListResponse<UserListItem>>;

  createUser(data: CreateUserRequest): Promise<void>;

  deleteUser(id: string): Promise<void>;

  getUserPollResponses(id: string): Promise<UserPollsResponse>;

  getAllPolls(): Promise<ListResponse<PollListItem>>;

  createPoll(data: CreatePollRequest): Promise<void>;

  getPollResponses(pollId: string): Promise<PollAnswersResponse>;

  getPollResponsesCount(pollId: string): Promise<PollResultResponse>;

  deletePoll(pollId: string): Promise<void>;

  castVote(pollId: string, details: CastVoteRequest): Promise<void>;
}

class ApiService implements IApiService {

  private configPromise?: Promise<IConfig>;

  private async buildRoute(path: string): Promise<string> {
    const config: IConfig = await this.getConfig();
    return `${config.apiUrl}${path}`;
  }

  async getConfig(): Promise<IConfig> {
    if (!this.configPromise) {
      this.configPromise = fetch('/config.json').then((r) => r.json());
    }

    return this.configPromise;
  }

  async getAllUsers(): Promise<ListResponse<UserListItem>> {
    const res = await fetch(await this.buildRoute('/users'));
    return res.json();
  }

  async createUser(data: CreateUserRequest): Promise<void> {
    await fetch(await this.buildRoute('/users'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string): Promise<void> {
    await fetch(await this.buildRoute(`/users/${id}`), { method: 'DELETE' });
  }

  async getUserPollResponses(id: string): Promise<UserPollsResponse> {
    const res = await fetch(await this.buildRoute(`/users/${id}/pollResponses`));
    return res.json();
  }

  async getAllPolls(): Promise<ListResponse<PollListItem>> {
    const res = await fetch(await this.buildRoute('/polls'));
    return res.json();
  }

  async createPoll(data: CreatePollRequest): Promise<void> {
    await fetch(await this.buildRoute('/polls'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async getPollResponses(pollId: string): Promise<PollAnswersResponse> {
    const res = await fetch(await this.buildRoute(`/polls/${pollId}/responses`));
    return res.json();
  }

  async getPollResponsesCount(pollId: string): Promise<PollResultResponse> {
    const res = await fetch(await this.buildRoute(`/polls/${pollId}/responses/count`));
    return res.json();
  }

  async deletePoll(pollId: string): Promise<void> {
    await fetch(await this.buildRoute(`/polls/${pollId}`), { method: 'DELETE' });
  }

  async castVote(pollId: string, details: CastVoteRequest): Promise<void> {
    await fetch(await this.buildRoute(`/polls/${pollId}/vote`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });
  }
}

export const apiService: IApiService = new ApiService();
