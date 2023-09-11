USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS AddReplyToCommentProc;
-- GO

CREATE OR ALTER PROCEDURE AddReplyToCommentProc
  @user_id VARCHAR(255),
  @parent_comment_id INT,
  @comment_text TEXT
AS
BEGIN
  -- Insert a new comment into the commentsTable as a reply to a comment
  INSERT INTO commentsTable (user_id, parent_comment_id, comment_text)
  VALUES (@user_id, @parent_comment_id, @comment_text);
  
  -- Optionally, you can return the newly created comment_id if needed
  SELECT SCOPE_IDENTITY() AS new_comment_id;
END;
