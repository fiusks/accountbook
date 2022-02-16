create table if not exists users (
  id serial primary key,
  name text not null,
  email text not null unique,
  password text not null,
  cpf text unique,
  phone text
);

create table if not exists clients (
  id serial primary key,
  name text not null,
  email text not null unique,
  cpf text not null unique,
  phone not null text,
  address text,
  complement text,
  zipcode text,
  district text,
  city text,
  state text,
);


create table if not exists bills (
  id serial primary key,
  client_ID int not null,
  amount bigint not null,
  description text not null,
  bill_status text not null,
  due_date date not null,
  foreign key (client_ID) references clients(id)
);