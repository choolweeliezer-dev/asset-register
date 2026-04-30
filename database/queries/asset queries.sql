SELECT * FROM assets;

SELECT * FROM categories;

SELECT * FROM USERS;

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'pas';

SELECT email, role FROM users;

INSERT INTO users (full_name, email, password, role, user_code)
VALUES ('John Doe', 'john@example.com', 12345678, 'ADMIN', 'A002');

UPDATE users SET role = 'ADMIN' WHERE role = 'ROLE_ADMIN';
UPDATE users SET role = 'USER' WHERE role = 'ROLE_USER';

