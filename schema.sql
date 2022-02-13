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
  status_De_Cobranca text default 'em dia'
);


create table if not exists cobrancas (
  id serial primary key,
  cliente_Id int not null,
  valor int not null,
  status_Cobranca text not null,
  data_Vencimento date not null,
  foreign key (cliente_Id) references clientes(id)
);

create table if not exists enderecos (
  id serial ,
  logradouro text,
  complemento text,
  CEP text,
  bairro text,
  cidade text,
  estado text,
  cliente_id int primary key,
  foreign key (cliente_id) references clientes(id)
);