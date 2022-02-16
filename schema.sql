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
  phone text not null,
  address text,
  complement text,
  zipcode text,
  district text,
  city text,
  state text
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

drop table bills;

insert into clients (name, email, cpf, phone) values ('Ruli', 'ruli@cubos.com', '12345699606', '71988747675');
insert into clients (name, email, cpf, phone) values ('Alfredo', 'alfafa@cozinhaArdente.com', '92039475638', '21983658473'); 
insert into clients (name, email, cpf, phone) values ('Muriel', 'mumu@lugarnenhum.com', '92000475638', '11383658473'); 
insert into clients (name, email, cpf, phone) values ('Zambi', 'mestre@daginga.com', '33039475638', '71983658473'); 


insert into bills (client_id, amount, description, bill_status, due_date) values (2, 200,'aaaaaaaaa', 'pending', '2022-02-17');
insert into bills (client_Id, amount, description, bill_status, due_date) values (2, 350,'bbbbbbbb', 'pending', '2022-02-18');
insert into bills (client_Id, amount, description, bill_status, due_date) values (4, 700,'ccccccc', 'pending', '2022-02-23');
insert into bills (client_Id, amount, description, bill_status, due_date) values (5, 2000,'dddddddd', 'pending', '2022-03-05');

insert into bills (client_Id, amount, description, bill_status, due_date) values (3, 205,'eeeeee', 'pending', '2022-02-11');
insert into bills (client_Id, amount, description, bill_status, due_date) values (2, 2060,'ffffffff', 'pending', '2022-02-07');
insert into bills (client_Id, amount, description, bill_status, due_date) values (4, 3510,'ggggggg', 'pending', '2022-01-15');
insert into bills (client_Id, amount, description, bill_status, due_date) values (3, 150,'hhhhhhh', 'pending', '2021-11-23');

insert into bills (client_Id, amount, description, bill_status, due_date) values (5, 756,'iiiiiii', 'paid', '2022-02-13');
insert into bills (client_Id, amount, description, bill_status, due_date) values (4, 985,'jjjjjjjjjjj', 'paid', '2022-02-05');
insert into bills (client_Id, amount, description, bill_status, due_date) values (3, 1004,'kkkkkkkkkk', 'paid', '2022-01-25');
insert into bills (client_Id, amount, description, bill_status, due_date) values (2, 15,'llllllllllllll', 'paid', '2021-12-21');
