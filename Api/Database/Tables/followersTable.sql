USE LInkup
GO

DROP TABLE IF EXISTS followersTable;

CREATE TABLE followersTable (
  follower_id INT IDENTITY(1,1) PRIMARY KEY,
  user_id VARCHAR(255),
  follower_user_id VARCHAR(255),
   created_at datetime2 DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (user_id) REFERENCES usersTable (id),
  FOREIGN KEY (follower_user_id) REFERENCES usersTable (id),
);

SELECT * FROM followersTable;

