-- Drop database if it exists
DROP DATABASE IF EXISTS techblog_db;

-- Create database
CREATE DATABASE techblog_db;

-- CREATE TABLE User (
--     id INTEGER NOT NULL AUTO_INCREMENT,
--     name VARCHAR(30) NOT NULL,
--     email VARCHAR(30) NOT NULL,
--     password VARCHAR(30) NOT NULL,
--     UNIQUE (name),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE Blog (
--     id INTEGER NOT NULL AUTO_INCREMENT,
--     title VARCHAR(30) NOT NULL,
--     content VARCHAR(30) NOT NULL,
--     date_created DATETIME NOT NULL,
--     user_id INTEGER NOT NULL,
--     PRIMARY KEY (id),
--     FOREIGN KEY (user_id) REFERENCES User(id)
-- );

-- CREATE TABLE Comment (
--     id INTEGER NOT NULL AUTO_INCREMENT,
--     comment VARCHAR(30) NOT NULL,
--     date_created DATETIME NOT NULL,
--     user_id INTEGER NOT NULL,
--     blog_id INTEGER NOT NULL,
--     PRIMARY KEY (id),
--     FOREIGN KEY (user_id) REFERENCES User(id),
--     FOREIGN KEY (blog_id) REFERENCES Blog(id)
-- );