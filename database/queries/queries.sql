select * from assets;
select * from user_sessions;
select * from categories;
select * from audit_log;
select * from maintenance_records;

select * from status;

SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'assets';

ALTER TABLE assets
DROP COLUMN next_maintenance;

ALTER TABLE maintenance_records
RENAME COLUMN date TO maintenance_date;

ALTER TABLE maintenance_records
ADD status VARCHAR(20);

ALTER TABLE maintenance_records
DROP COLUMN maintenance_date;