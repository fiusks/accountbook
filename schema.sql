create table if not exists usuarios (
  id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null,
  cpf text unique,
  telefone text unique
);
create tabel if not exists enderecos (
  id serial primary key,

);

create table if not exists clientes (
  id serial primary key,
  nome text not null,
  email text not null unique,
  cpf text unique,
  telefone text unique
  endereco_id int
  foreign key (endereco_id) references enderecos(id)
);
