CREATE TABLE status (
    status_id BIGSERIAL PRIMARY KEY,

    code VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),

    category VARCHAR(50) NOT NULL,
    -- examples: 'USER', 'ASSET', 'MAINTENANCE'

    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE maintenance_records (
    maintenance_id BIGSERIAL PRIMARY KEY,

    asset_id BIGINT NOT NULL,

    reported_by BIGINT,
    assigned_to BIGINT,

    issue_description TEXT NOT NULL,

    maintenance_status_id BIGINT NOT NULL,

    cost DECIMAL(10,2) DEFAULT 0.00,

    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,

    notes VARCHAR(255),

    CONSTRAINT fk_maintenance_asset
        FOREIGN KEY (asset_id)
        REFERENCES assets(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_maintenance_reporter
        FOREIGN KEY (reported_by)
        REFERENCES users(id),

    CONSTRAINT fk_maintenance_assigned_to
        FOREIGN KEY (assigned_to)
        REFERENCES users(id),

    CONSTRAINT fk_maintenance_status
        FOREIGN KEY (maintenance_status_id)
        REFERENCES status(status_id)
);

ALTER TABLE assets
ADD COLUMN status_id BIGINT,
ADD COLUMN created_by BIGINT,
ADD COLUMN updated_by BIGINT;

ALTER TABLE assets
ADD CONSTRAINT fk_assets_status
FOREIGN KEY (status_id)
REFERENCES status(status_id);

ALTER TABLE assets
ADD CONSTRAINT fk_assets_created_by
FOREIGN KEY (created_by)
REFERENCES users(id);

ALTER TABLE assets
ADD CONSTRAINT fk_assets_updated_by
FOREIGN KEY (updated_by)
REFERENCES users(id);