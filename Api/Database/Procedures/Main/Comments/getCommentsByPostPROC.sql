USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS GetCommentsByPostProc;
-- GO

CREATE OR ALTER PROCEDURE GetCommentsByPostProc
  @post_id INT
AS
BEGIN
  -- Retrieve all comments for the specified post
  SELECT comment_id, user_id, comment_text, created_at
  FROM commentsTable
  WHERE post_id = @post_id;
END;
