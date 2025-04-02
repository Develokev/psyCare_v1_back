--DATABASE--
--TABLES TO CREATE--

--roles TABLE--
CREATE TABLE roles (
  role varchar(15) PRIMARY KEY
);

--users TABLE--
CREATE TABLE users (
  user_id serial PRIMARY KEY,
  role varchar(10) NOT NULL,
  name varchar(45) NOT NULL,
  last_name varchar(45) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  avatar varchar(255) NOT NULL,
  register_date date DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT FK_roles
    FOREIGN KEY (role)
    REFERENCES roles(role)
);

--appoState TABLE--
CREATE TABLE appoState (
  status varchar(25) PRIMARY KEY
);

--appointments TABLE--
CREATE TABLE appointments (
  appo_id serial PRIMARY KEY,
  appoDate varchar(50) NOT NULL,
  appoTime varchar(15) NOT NULL,
  appoType varchar(25) NOT NULL,
  user_id int NOT NULL,
  status varchar(25) NOT NULL,
  CONSTRAINT FK_users
    FOREIGN KEY (user_id)
    REFERENCES users(user_id),
  CONSTRAINT FK_appoState
    FOREIGN KEY (status)
    REFERENCES appoState(status)
);

--!TEST TABLE DATA 
-- FOR USERS--
INSERT INTO users (

    role,
    name,
    last_name,
    email,
    password,
    avatar

) VALUES
('admin','Paloma','Rojas','paloma@correo.es','admin','https://randomuser.me/api/portraits/thumb/women/75.jpg'),
('patient','Kevin','Escobar','kevin@correo.es','123456','https://randomuser.me/api/portraits/thumb/men/74.jpg'),
('patient','Andrés','Leon','andres@correo.es','123456','https://randomuser.me/api/portraits/thumb/men/78.jpg'),
('patient','María','Almazan','maria@correo.es','123456','https://randomuser.me/api/portraits/thumb/women/76.jpg'),
('patient','Marcos','Delgado','barneto@correo.es','123456','https://randomuser.me/api/portraits/thumb/men/77.jpg'),
('patient','Esther','Roncalla','mesterc@correo.es','123456','https://randomuser.me/api/portraits/thumb/women/73.jpg')

--!TEST TABLE DATA
-- FOR ROLES--
INSERT INTO roles (role)
    VALUES
    ('admin'),
    ('patient')

--!TEST TABLE DATA
-- FOR APPOSTATUS--
INSERT INTO appoState (status)
    VALUES
	('pending'),
	('confirmed'),
	('paid'),
	('cancelled')

--!TEST TABLE DATA
--FOR APPOINTMENTS--
INSERT INTO appointments (

    appoDate,
    appoTime,
    appoType,
    user_id,
    status

) VALUES
('16-05-2023', '10:00', 'face-to-face', 2, "pending"),
('16-05-2023', '15:00', 'face-to-face', 2, "pending"),
('16-05-2023', '18:00', 'online', 2, "pending"),
('18-05-2023', '10:00', 'online', 35, "pending"),
('18-05-2023', '15:00', 'face-to-face', 36, "pending"),
('18-05-2023', '18:00', 'online', 37, "pending"),
('20-05-2023', '15:00', 'face-to-face', 38, "pending"),
('20-05-2023', '18:00', 'face-to-face', 39, "pending"),
('25-05-2023', '10:00', 'face-to-face', 40, "pending"),
('25-05-2023', '15:00', 'face-to-face', 39, "pending"),
('25-05-2023', '18:00', 'online', 38, "pending"),
('27-05-2023', '10:00', 'online', 36, "pending"),
('27-05-2023', '15:00', 'face-to-face', 36, "pending"),
('27-05-2023', '18:00', 'online', 32, "pending"),
('29-05-2023', '15:00', 'face-to-face', 33, "pending"),
('29-05-2023', '18:00', 'face-to-face', 33, "pending")