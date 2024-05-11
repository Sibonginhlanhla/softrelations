CREATE TABLE IF NOT EXISTS timesheets(
    taskId INTEGER PRIMARY KEY,
    description TEXT NOT NULL,
    taskHours INTEGER,
    completionDate TEXT,
    assignedBy INTEGER, -- manager's userId
    projectId INTEGER,
    assignedTo INTEGER, -- staff userId
    FOREIGN KEY(assignedBy) REFERENCES users(userId),
    FOREIGN KEY(projectId) REFERENCES projects(projectId),
    FOREIGN KEY(assignedTo) REFERENCES users(userId)
);