-- See all courses
SELECT title, code FROM Course;

-- See all users
SELECT * FROM User;

SELECT count(id) FROM User;

-- See all user course completions
SELECT * FROM UserCourseCompletion;
-- ... Not very useful, it just shows the machine IDs

-- We need to "Join" the useful information. To start with a simple example: How many times has each course been completed?
-- This involes a query on the UserCourseCompletion table "counting" the `course_id`. Then we "Join" the course ID/title
-- to get the human-readable field
SELECT Course.title, Course.code, count(course_completion.course_id) FROM Course
  LEFT JOIN UserCourseCompletion AS course_completion ON course_completion.course_id = Course.id
  GROUP BY Course.id;

-- So now for a more complex join using the junction table. Let's also add some ordering to the results
SELECT User.first_name, User.last_name, Course.title, course_completion.completion_date FROM User
  LEFT JOIN UserCourseCompletion AS course_completion ON course_completion.user_id = User.id
  LEFT JOIN Course ON Course.id = course_completion.course_id
  ORDER BY course_completion.completion_date ASC;
