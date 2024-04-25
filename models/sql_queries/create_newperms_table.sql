CREATE TABLE IF NOT EXISTS newpermissions(
    userId INTEGER,
    permission TEXT,
    FOREIGN KEY(permission) REFERENCES defaultpermissions(permission),
    FOREIGN KEY(userId) REFERENCES users(userID)
);