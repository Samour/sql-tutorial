DELETE FROM UserCourseCompletion;
DELETE FROM User;
DELETE FROM Course;

INSERT INTO Course (id, title, code) VALUES
  ('1913414f-7580-4584-a997-8d8cada27442', 'Basic SQL', 'SQL101'),
  ('352c4f36-8db1-40ed-bc17-ac663152a6f7', 'SQL Continued', 'SQL102'),
  ('a4d58083-d72f-4182-bde9-d6961af5089c', 'Advanced SQL', 'SQL201'),
  ('65e59deb-b920-48ae-bef6-1cde0fc8630e', 'Basic Java', 'JVA101'),
  ('3fb33a18-cfa0-4316-b709-e65ff79027e7', 'Advanced Java', 'JVA201'),
  ('488aa250-9e99-4fd6-ad98-371877f3b079', 'Awesome Skills', 'AWE300'),
  ('3dcf5d22-cc96-4cf2-bf39-b0e28485d637', 'Advanced Law', 'LAW301')
;

INSERT INTO User (id, email, first_name, last_name, sign_up_date) VALUES
  ('856eb439-baa9-4a8b-b676-53e40cfe4361', 'aaron@place.me', 'Aaron', 'Burke', '2020-09-16 12:00:00'),
  ('1cc06673-402f-499d-8b86-7f218d1428b1', 'elise@somewhere.com', 'Elise', 'Burke', '2020-08-10 09:30:00')
;

INSERT INTO UserCourseCompletion (id, user_id, course_id, completion_date) VALUES
  ('2bed1a82-c0cf-41de-83b5-2b25ca56c81d', '856eb439-baa9-4a8b-b676-53e40cfe4361', '1913414f-7580-4584-a997-8d8cada27442', '2014-03-09 22:45:00'),
  ('220baf38-3d86-49c4-8a64-0604370836fb', '856eb439-baa9-4a8b-b676-53e40cfe4361', '352c4f36-8db1-40ed-bc17-ac663152a6f7', '2014-03-10 22:45:00'),
  ('db14bf13-3545-421a-9ab2-a61dbd3a2f16', '856eb439-baa9-4a8b-b676-53e40cfe4361', 'a4d58083-d72f-4182-bde9-d6961af5089c', '2014-03-11 22:45:00'),
  ('bad69aea-71f3-4b72-9f5a-4626c4c40db6', '856eb439-baa9-4a8b-b676-53e40cfe4361', '65e59deb-b920-48ae-bef6-1cde0fc8630e', '2011-08-21 14:00:00'),
  ('64e7f2de-489a-4c31-8d74-7c70290d57fc', '856eb439-baa9-4a8b-b676-53e40cfe4361', '3fb33a18-cfa0-4316-b709-e65ff79027e7', '2011-08-23 14:00:00'),
  ('16ba250b-847a-43ea-9e60-8d8c88586c65', '856eb439-baa9-4a8b-b676-53e40cfe4361', '3fb33a18-cfa0-4316-b709-e65ff79027e7', '2016-04-01 13:00:00'),
  ('27e1a0af-7364-45cd-847e-52514730fa59', '1cc06673-402f-499d-8b86-7f218d1428b1', '488aa250-9e99-4fd6-ad98-371877f3b079', '2000-09-09 01:00:00')
;
