CREATE TABLE audit_logs (

    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT,

    action VARCHAR(100) NOT NULL,

    entity_name VARCHAR(100),

    entity_id BIGINT,

    old_value TEXT,

    new_value TEXT,

    description TEXT,

    ip_address VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

SELECT * FROM audit_logs;