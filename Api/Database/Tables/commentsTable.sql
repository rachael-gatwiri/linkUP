USE Linkup;
GO

DROP TABLE IF EXISTS commentsTable;
-- GO

CREATE TABLE commentsTable (
  comment_id INT IDENTITY(1,1) PRIMARY KEY,
  user_id VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  profile_image_url VARCHAR(255),
  post_id INT, 
  parent_comment_id INT,
  comment_text TEXT NOT NULL,
  created_at datetime2 DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (user_id) REFERENCES usersTable(id),
  FOREIGN KEY (post_id) REFERENCES postsTable(post_id),
  FOREIGN KEY (parent_comment_id) REFERENCES commentsTable(comment_id)
);
GO




