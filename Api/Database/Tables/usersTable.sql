USE linkup;
GO

-- users

DROP TABLE IF EXISTS usersTable;

CREATE TABLE usersTable (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(MAX) DEFAULT '', -- Set default value to an empty string
    profile_image_url VARCHAR(255) DEFAULT 'https://i.imgur.com/6VBx3io.png', -- Set default value to a placeholder image
);
GO

SELECT * FROM usersTable;