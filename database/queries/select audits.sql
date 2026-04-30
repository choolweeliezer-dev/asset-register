SELECT * FROM audit_logs;

SELECT * FROM user_sessions;

SELECT column_name
FROM information_schema.columns
WHERE table_name = 'audit_logs';