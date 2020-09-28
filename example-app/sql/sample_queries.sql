select * from User;

delete from User where id ='daa9a3eb-74c9-4606-8a18-4666b26f7dfd';

select * from Poll;

select * from PollOption;

select * from PollResponse;

-- Count responses for poll
select opt.option, count(response.response_id) from PollOption as opt
	left join PollResponse as response on opt.id = response.response_id
    where opt.poll_id = 'b1d76cb8-f71e-4791-832a-ebcfe2c610b8'
    group by opt.id;

-- Get all responses for poll
select user.first_name, user.last_name, opt.option from PollResponse as response
	join User on response.user_id = user.id
    join PollOption as opt on response.response_id = opt.id
    where response.poll_id = 'b1d76cb8-f71e-4791-832a-ebcfe2c610b8';

-- Get all responses for user
select poll.id as poll_id, poll.title, opt.id as option_id, opt.option from PollResponse as response
	join Poll on response.poll_id = poll.id
    join PollOption as opt on response.response_id = opt.id
    where response.user_id = '1cc06673-402f-499d-8b86-7f218d1428b1';
