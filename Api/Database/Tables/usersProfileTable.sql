USE Linkup
GO

DROP TABLE IF EXISTS usersProfileTable;

CREATE TABLE usersProfileTable (
  user_id VARCHAR(255) PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  profile_image_url VARCHAR(255), 
  default_image_url VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES usersTable (id)
);

SELECT * FROM usersProfileTable;
