create table
    users (
        id serial primary key,
        username varchar(50) unique not null,
        password_hash text not null,
        balance float default 500.123
    );

create table
    products (
        id serial primary key,
        name varchar(50) not null,
        price float not null
    );

create table
    purchases (
        id serial primary key,
        user_id int references users (id) on delete cascade,
        product_id int references products (id) on delete cascade,
        purchased_at timestamp default CURRENT_TIMESTAMP
    );