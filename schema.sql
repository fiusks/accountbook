
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
  endereco_id int,
  status_de_cobranca text default 'em dia',
  foreign key (endereco_id) references enderecos(id)
);


create table if not exists cobrancas (
  id serial primary key,
  cliente_id int ,
  valor int not null,
  status_cobranca text default 'em dia',
  data_vencimento date not null,
  foreign key (cliente_id) references clientes(id)
);

create table if not exists enderecos (
  id int primary key unique not null,
  logradouro text,
  complemento text,
  CEP numeric,
  bairro text,
  cidade text,
  estado text
);
