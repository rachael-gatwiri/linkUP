USE Linkup
GO

DROP TABLE IF EXISTS postsTable;


CREATE TABLE postsTable (
  post_id INT IDENTITY(1,1) PRIMARY KEY,
  user_id VARCHAR(255),
  content TEXT NOT NULL,
  post_image_url VARCHAR(255) NOT NULL,
  created_at datetime2 DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (user_id) REFERENCES usersTable (id)
);

SELECT * FROM postsTable;