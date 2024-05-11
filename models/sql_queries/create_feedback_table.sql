CREATE TABLE IF NOT EXISTS feedback(
    feedbackId INTEGER PRIMARY KEY,
    rating INTEGER NOT NULL, -- e.g 1 to 5
    comments TEXT NOT NULL,
    notify BOOLEAN, 
    createdBy INTEGER,
    feedbackFrom INTEGER,
    feedbackTo INTEGER,
    FOREIGN KEY(createdBy) REFERENCES users(userId)
    FOREIGN KEY(feedbackFrom) REFERENCES users(userId)
    FOREIGN KEY(feedbackTo) REFERENCES users(userId)
);