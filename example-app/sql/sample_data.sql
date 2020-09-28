INSERT INTO User (id, email, first_name, last_name, sign_up_date) VALUES
  ('856eb439-baa9-4a8b-b676-53e40cfe4361', 'aaron@place.me', 'Aaron', 'Burke', '2020-09-16 12:00:00'),
  ('1cc06673-402f-499d-8b86-7f218d1428b1', 'elise@somewhere.com', 'Elise', 'Burke', '2020-08-10 09:30:00')
;

INSERT INTO Poll (id, owner_user_id, title) VALUES
  ('273480d6-258a-4fa3-af0e-19c9b06a5a69', '856eb439-baa9-4a8b-b676-53e40cfe4361', 'Lunch Options'),
  ('b1d76cb8-f71e-4791-832a-ebcfe2c610b8', '856eb439-baa9-4a8b-b676-53e40cfe4361', 'Game Options')
;

INSERT INTO PollOption (id, poll_id, `option`, `order`) VALUES
  ('bd34ab57-b0ba-4694-8dbb-6b0c92d2592d', '273480d6-258a-4fa3-af0e-19c9b06a5a69', 'Gyros', 0),
  ('1669c4cb-9edd-4720-86c1-80f8ca2b5f7f', '273480d6-258a-4fa3-af0e-19c9b06a5a69', 'Thai', 1),
  ('b25a7ef7-ee06-49ab-b049-8cf0d6391422', '273480d6-258a-4fa3-af0e-19c9b06a5a69', 'Chicken', 2),
  ('7303910f-c247-4a9c-8901-aa039bd0eeec', '273480d6-258a-4fa3-af0e-19c9b06a5a69', 'Pizza', 3),
  ('a1b48384-9eec-4153-a666-fe46ba97cc31', 'b1d76cb8-f71e-4791-832a-ebcfe2c610b8', 'Super Smash Bros Ultimate', 0),
  ('ccd6fa6c-e8a9-47b3-93db-33efb62c5517', 'b1d76cb8-f71e-4791-832a-ebcfe2c610b8', 'Legend of Zelda: Breath of the Wild', 1),
  ('b27b2a1c-866f-4716-a349-3ec728de43ad', 'b1d76cb8-f71e-4791-832a-ebcfe2c610b8', 'Paper Mario and the Origami King', 2),
  ('29ad721d-8082-4e71-893c-b3a98fcdde22', 'b1d76cb8-f71e-4791-832a-ebcfe2c610b8', 'Super Mario Odyssey', 3),
  ('3ab9f278-eec4-453d-9421-78d93229cceb', 'b1d76cb8-f71e-4791-832a-ebcfe2c610b8', 'Pokemon Sword', 4)
;

INSERT INTO PollResponse (poll_id, user_id, response_id, response_time) VALUES
  ('b1d76cb8-f71e-4791-832a-ebcfe2c610b8', '856eb439-baa9-4a8b-b676-53e40cfe4361', '29ad721d-8082-4e71-893c-b3a98fcdde22', '2020-09-16 22:59:00'),
  ('273480d6-258a-4fa3-af0e-19c9b06a5a69', '856eb439-baa9-4a8b-b676-53e40cfe4361', 'bd34ab57-b0ba-4694-8dbb-6b0c92d2592d', '2020-09-16 23:01:00'),
  ('b1d76cb8-f71e-4791-832a-ebcfe2c610b8', '1cc06673-402f-499d-8b86-7f218d1428b1', 'a1b48384-9eec-4153-a666-fe46ba97cc31', '2020-09-16 23:02:00'),
  ('273480d6-258a-4fa3-af0e-19c9b06a5a69', '1cc06673-402f-499d-8b86-7f218d1428b1', 'b25a7ef7-ee06-49ab-b049-8cf0d6391422', '2020-09-16 23:03:00')
;

-- App user
CREATE USER 'app_be'@'localhost' IDENTIFIED BY '23tfKZSLwDsY';
