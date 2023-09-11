USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS EditCommentProc;
-- GO

CREATE OR ALTER PROCEDURE EditCommentProc
  @comment_id INT,
  @user_id VARCHAR(255),
  @new_comment_text TEXT
AS
BEGIN
  -- Check if the user is the owner of the comment
  IF EXISTS (SELECT 1 FROM commentsTable WHERE comment_id = @comment_id AND user_id = @user_id)
  BEGIN
    -- Update the comment text if the user is the owner
    UPDATE commentsTable
    SET comment_text = @new_comment_text
    WHERE comment_id = @comment_id OR parent_comment_id = @comment_id;
  END;
  -- Optionally, you can return a success message or error message as needed
END;

