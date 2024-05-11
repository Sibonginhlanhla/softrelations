-- database: c:\Users\just_a_tech\Documents\2024\COMS\COMS3009 - SD\Project\SoftRelationsApp\softrelations\models\database\srdatabase.sqlite

-- Use the ▷ button in the top right corner to run the entire file.

CREATE TABLE IF NOT EXISTS bookingoptions(
    bookingId INTEGER PRIMARY KEY,
    bookingType TEXT NOT NULL,
    bookingDescription TEXT NOT NULL,
    availabilityDateTime DATETIME NOT NULL
);



