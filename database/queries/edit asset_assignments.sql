SELECT * FROM asset_assignments;

ALTER TABLE asset_assignments
ADD COLUMN assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE asset_assignments
ADD COLUMN returned_at TIMESTAMP NULL;

ALTER TABLE asset_assignments
ADD COLUMN is_active BOOLEAN DEFAULT TRUE;

ALTER TABLE asset_assignments
ADD COLUMN assigned_by VARCHAR(225);

ALTER TABLE asset_assignments
ADD COLUMN returned_by;

ALTER TABLE asset_assignments
ADD COLUMN notes VARCHAR(255);

ALTER TABLE asset_assignments
ADD CONSTRAINT fk_asset_assignments_asset
FOREIGN KEY (asset_id) REFERENCES assets(id)
ON DELETE CASCADE;

ALTER TABLE asset_assignments
ADD CONSTRAINT fk_asset_assignments_user
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE;

ALTER TABLE asset_assignments
ADD CONSTRAINT fk_asset_assignments_assigned_by
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE asset_assignments
ADD CONSTRAINT fk_asset_assignments_returned_by
FOREIGN KEY (returned_by) REFERENCES users(id);