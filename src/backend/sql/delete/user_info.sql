delete from notifications where user_id = ?;
delete from tasks_categories where task_id in (select id from tasks where user_id = ?);
delete from tasks where user_id = ?;
delete from priorities where user_id = ?;
delete from timelines where affair_id in (select id from affairs where user_id = ?);
delete from affairs where user_id = ?;
delete from users_phone where user_id = ?;
delete from categories where user_id = ?;
delete from user_permissions where user_id = ?;
delete from user_logs where user_id = ?;
delete from users where id = ?