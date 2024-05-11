CREATE TABLE IF NOT EXISTS users (
    userId INTEGER PRIMARY KEY, -- think of it as staff number
    googleId INTEGER UNIQUE, -- this will be assigned when user signs in first time
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    roleName TEXT,
    FOREIGN KEY(roleName) REFERENCES roles(roleName)
);

ALTER TABLE users ADD COLUMN managerUserId INTEGER;
