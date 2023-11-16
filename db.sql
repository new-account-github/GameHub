create table NFT(
	id bigint identity primary key,
	name varchar(255),
	mint varchar(255),
	ranks int,
	encoded_transaction varchar(max),
	active bit
);

drop table authority

select * from account


create table Account(
	id bigint identity primary key,
	username varchar(255),
	password varchar(255),
	fullname varchar(255),
);
 
create table Roles(
	id bigint identity primary key,
	name nvarchar(255)
);

create table Authority(
	id bigint identity primary key,
	idaccount bigint foreign key references Account(id),
	idrole bigint foreign key references Roles(id)
);

insert into Roles(name)
values
('ADMIN'),
('STAFF'),
('USER');

insert into Authority(idaccount,idrole)
values
(1,1),
(2,2);
