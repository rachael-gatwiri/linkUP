USE Linkup
GO

-- DROP TABLE IF EXISTS likesTable;

CREATE TABLE likesTable (
  like_id INT IDENTITY(1,1) PRIMARY KEY,
  user_id VARCHAR(255),
  post_id INT,
  created_at datetime2 DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (user_id) REFERENCES usersTable(id),
  FOREIGN KEY (post_id) REFERENCES postsTable(post_id),
);

SELECT * FROM likesTable;
