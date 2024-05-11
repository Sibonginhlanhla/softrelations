CREATE TABLE IF NOT EXISTS bookings(
    fulfilledFlag BOOLEAN NOT NULL DEFAULT 0, -- 1 if fullfilled
    bookingId INTEGER,
    bookedBy INTEGER,
    FOREIGN KEY(bookingId) REFERENCES bookingoptions(bookingId),
    FOREIGN KEY(bookedBy) REFERENCES users(userId)
);
