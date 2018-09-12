-- INSERT INTO users (count) values (1);
-- INSERT INTO users (count) values (user has been greeted once again 3);

-- drop table users;

create table users(
    id serial not null primary key,
    id_name VARCHAR(50) not null,
    count int not null DEFAULT 0
);

-- INSERT INTO users (id_name) values ('Shaun has been greeted again ');