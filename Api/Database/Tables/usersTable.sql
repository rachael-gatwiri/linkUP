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
    token VARCHAR(MAX) DEFAULT '', 
    profile_image_url VARCHAR(MAX) DEFAULT 'http://res.cloudinary.com/dykqrsfny/image/upload/v1695032018/kzzp1qaxz06rksc7axsx.jpg' 
);
GO

SELECT * FROM usersTable;