-- TODO remove sample data
-- create db and schema
SELECT 'CREATE DATABASE mydb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mydb');
\c mydb;
CREATE SCHEMA IF NOT EXISTS myschema;

-- Grant privileges to user(s)
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

