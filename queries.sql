--DATABASE--
--TABLES TO CREATE--

--roles TABLE--
CREATE TABLE roles (
  role_id serial PRIMARY KEY,
  role varchar(10) NOT NULL
);

--users TABLE--
CREATE TABLE users (
  user_id serial PRIMARY KEY,
  role_id int,
  name varchar(45) NOT NULL,
  last_name varchar(45) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  avatar varchar(255) NOT NULL,
  register_date date DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT FK_roles
    FOREIGN KEY (role_id)
    REFERENCES roles(role_id)
);

--appoStatus TABLE--
CREATE TABLE appoStatus (
  status_id serial PRIMARY KEY,
  status varchar(25) NOT NULL
);

--appointments TABLE--
CREATE TABLE appointments (
  appo_id serial PRIMARY KEY,
  appoName varchar(100) NOT NULL,
  appoDate varchar(50) NOT NULL,
  appoTime varchar(15) NOT NULL,
  appoType varchar(25) NOT NULL,
  user_id int,
  status_id int,
  CONSTRAINT FK_users
    FOREIGN KEY (user_id)
    REFERENCES users(user_id),
  CONSTRAINT FK_appoStatus
    FOREIGN KEY (status_id)
    REFERENCES appoStatus(status_id)
);