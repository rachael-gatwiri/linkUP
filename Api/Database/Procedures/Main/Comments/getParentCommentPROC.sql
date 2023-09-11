USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS GetParentCommentsByCommentProc;
-- GO

CREATE OR ALTER PROCEDURE GetParentCommentsByCommentProc
  @comment_id INT
AS
BEGIN
  -- Retrieve all parent comments (comments that the specified comment is a reply to)
  SELECT comment_id, user_id, comment_text, created_at
  FROM commentsTable
  WHERE parent_comment_id = @comment_id;
END;
