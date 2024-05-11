CREATE TABLE IF NOT EXISTS projects(
    projectId INTEGER PRIMARY KEY,
    projectName TEXT NOT NULL UNIQUE,
    projectDescription TEXT NOT NULL,
    completionFlag BOOLEAN NOT NULL DEFAULT 0,
    projectManager INTEGER, --manager's userId
    FOREIGN KEY(projectManager) REFERENCES users(userId)
);
