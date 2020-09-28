export interface UserDb {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  sign_up_date: Date;
}

export interface PollDb {
  id: string;
  owner_user_id: string;
  title: string;
}

export interface UserPollResponseDb {
  poll_id: string;
  title: string;
  option_id: string;
  option: string;
}

export interface PollResponseDb {
  user_id: string;
  first_name: string;
  last_name: string;
  option_id: string;
  option: string;
}

export interface PollResultDb {
  option_id: string;
  option: string;
  count: number;
}
