SELECT * FROM users;

ALTER TABLE users

ADD COLUMN is_active BOOLEAN DEFAULT TRUE,

ADD COLUMN last_login TIMESTAMP NULL,

ADD COLUMN failed_login_attempts INT DEFAULT 0,

ADD COLUMN account_locked BOOLEAN DEFAULT FALSE;

ALTER TABLE users
ADD CONSTRAINT uq_users_usercode UNIQUE (usercode);

ALTER TABLE users
ADD CONSTRAINT uq_users_email UNIQUE (email); 

ALTER TABLE users
ADD CONSTRAINT chk_user_role
CHECK (role IN ('ADMIN', 'USER'));