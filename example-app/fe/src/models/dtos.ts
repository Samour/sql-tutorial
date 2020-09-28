export interface ListItemResponse {
  id: string;
  displayTitle: string;
}

export interface UserListItem extends ListItemResponse {
  email: string;
  firstName: string;
  lastName: string;
}

export interface PollListItem extends ListItemResponse {
}

export interface ListResponse<T extends ListItemResponse> {
  items: T[];
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserPollEntry {
  poll: {
    id: string;
    title: string;
  };
  option: {
    id: string;
    title: string;
  };
}

export interface UserPollsResponse {
  polls: UserPollEntry[];
}

export interface CreatePollRequest {
  userId: string;
  title: string;
  responses: string[];
}

export interface PollUserAnswer {
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  option: {
    id: string;
    title: string;
  };
}

export interface PollAnswersResponse {
  answers: PollUserAnswer[];
}

export interface PollOptionResult {
  option: {
    id: string;
    title: string;
  };
  count: number;
}

export interface PollResultResponse {
  options: PollOptionResult[];
}

export interface CastVoteRequest {
  userId: string;
  optionId: string;
}
