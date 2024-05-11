CREATE TABLE IF NOT EXISTS defaultpermissions(
    permission TEXT PRIMARY KEY,
    apiPathSubDir TEXT NOT NULL UNIQUE, -- e.g softrelations.com/admin/login => the '/admin' is a sub directory
    roleName TEXT,
    FOREIGN KEY(roleName) REFERENCES roles(roleName)
);

ALTER TABLE defaultpermissions ADD COLUMN httpMethod TEXT NOT NULL;
