CREATE TABLE IF NOT EXISTS User(
  id char(36) PRIMARY KEY NOT NULL,
  email varchar(255),
  first_name varchar(127),
  last_name varchar(127),
  sign_up_date datetime
);

CREATE TABLE IF NOT EXISTS Poll(
  id char(36) PRIMARY KEY NOT NULL,
  owner_user_id char(36) NOT NULL,
  title varchar(255),
  FOREIGN KEY (owner_user_id) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS PollOption(
  id char(36) PRIMARY KEY NOT NULL,
  poll_id char(36) NOT NULL,
  `option` varchar(1023),
  `order` int,
  FOREIGN KEY (poll_id) REFERENCES Poll(id)
);

CREATE TABLE IF NOT EXISTS PollResponse(
  poll_id char(36) NOT NULL,
  user_id char(36) NOT NULL,
  response_id char(36) NOT NULL,
  response_time datetime,
  PRIMARY KEY (poll_id, user_id),
  FOREIGN KEY (poll_id) REFERENCES Poll(id),
  FOREIGN KEY (user_id) REFERENCES User(id),
  FOREIGN KEY (response_id) REFERENCES PollOption(id)
);
