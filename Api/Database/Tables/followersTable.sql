USE Linkup;
GO

DROP TABLE IF EXISTS followersTable;

CREATE TABLE followersTable (
  follower_id VARCHAR(255),
  following_id VARCHAR(255),
  PRIMARY KEY (follower_id, following_id),
  FOREIGN KEY (follower_id) REFERENCES usersTable (id),
  FOREIGN KEY (following_id) REFERENCES usersTable (id)
);

SELECT * FROM followersTable;


