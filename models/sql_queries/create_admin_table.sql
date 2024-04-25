CREATE TABLE IF NOT EXISTS admin (
    adminId INTEGER PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL UNIQUE,
    isLoggedIn BOOLEAN NOT NULL -- 0 or 1
);