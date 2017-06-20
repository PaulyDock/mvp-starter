DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;

CREATE TABLE items (
  id int NOT NULL AUTO_INCREMENT,
  month integer NOT NULL,
  num integer NOT NULL,
  link varchar(50),
  year integer NOT NULL,
  news varchar(200),
  safe_title varchar(50),
  transcript varchar(500) NOT NULL,
  alt varchar(200),
  img varchar(100) NOT NULL,
  title varchar(50) NOT NULL,
  day integer NOT NULL,
  PRIMARY KEY (id)
);


/*
CREATE TABLE users (
  id int NOT NULL AUTO-INCREMENT,


);

CREATE TABLE strips_users (




);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/