USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS AddCommentOrReplyProc;
-- GO

CREATE OR ALTER PROCEDURE AddCommentOrReplyProc
  @user_id VARCHAR(255),
  @post_id INT,
  @parent_comment_id INT,
  @comment_text TEXT
AS
BEGIN
  IF @parent_comment_id IS NULL
  BEGIN
    -- Insert a new comment into the commentsTable for a post
    INSERT INTO commentsTable (user_id, post_id, comment_text)
    VALUES (@user_id, @post_id, @comment_text);
  END
  ELSE
  BEGIN
    -- Insert a new comment into the commentsTable as a reply to a comment
    INSERT INTO commentsTable (user_id, parent_comment_id, comment_text)
    VALUES (@user_id, @parent_comment_id, @comment_text);
  END

  -- Optionally, you can return the newly created comment_id if needed
  SELECT SCOPE_IDENTITY() AS new_comment_id;
END;
