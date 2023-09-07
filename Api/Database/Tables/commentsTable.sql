USE Linkup
GO

DROP TABLE IF EXISTS commentsTable;

CREATE TABLE commentsTable (
  comment_id INT IDENTITY(1,1) PRIMARY KEY,
  user_id VARCHAR(255),
  post_id INT,
  comment_image_url VARCHAR(255),
  parent_comment_id INT, -- NULL for top-level comments, references comment_id for replies
  content TEXT NOT NULL,
  created_at datetime2 DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (user_id) REFERENCES usersTable(id),
  FOREIGN KEY (post_id) REFERENCES postsTable(post_id),
  FOREIGN KEY (parent_comment_id) REFERENCES commentsTable(comment_id)
);

SELECT * FROM commentsTable;