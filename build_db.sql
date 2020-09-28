DROP TABLE IF EXISTS UserCourseCompletion;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS User;

CREATE TABLE Course(
  id char(36) PRIMARY KEY,
  title varchar(255),
  code char(6) UNIQUE
);

CREATE TABLE User(
  id char(36) PRIMARY KEY,
  email varchar(255),
  first_name varchar(127),
  last_name varchar(127),
  sign_up_date datetime
);

CREATE TABLE UserCourseCompletion(
  id char(36) PRIMARY KEY,
  user_id char(36),
  course_id char(36),
  completion_date date,
  FOREIGN KEY (user_id) REFERENCES User(id),
  FOREIGN KEY (course_id) REFERENCES Course(id)
);
