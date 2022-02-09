create table if not exists usuarios (
  id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null,
  cpf text unique,
  telefone text unique
);

create table if not exists clientes (
  id serial primary key,
  nome text not null,
  email text not null unique,
  cpf text unique,
  telefone text,
  endereco text,
  status_de_cobranca text default 'em dia',
);

create table if not exists cobrancas (
  id serial primary key,
  cliente_id int,
  valor int not null,
  status_cobranca default 0,
  data_vencimento date not null
  foreign key (client_id) references clientes(id)
);
