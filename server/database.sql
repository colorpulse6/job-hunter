CREATE DATABASE jobhunter;

CREATE TABLE users
(
    id uuid PRIMARY KEY DEFAULT
    
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


INSERT INTO users
    (user_name, user_email, user_password)
VALUES
    ('John', 'john@john.com', '111111');