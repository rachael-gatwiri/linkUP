-- Create a stored procedure to delete a comment
USE Linkup
GO

DROP PROCEDURE IF EXISTS deleteCommentPROC;
GO

CREATE PROCEDURE deleteCommentPROC
  @comment_id INT,
  @user_id VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the user_id exists in the usersTable (foreign key constraint check)
  IF NOT EXISTS (SELECT 1 FROM usersTable WHERE id = @user_id)
  BEGIN
    RAISERROR('User not found.', 16, 1);
    RETURN;
  END;

  -- Check if the comment_id exists in the commentsTable and is owned by the user
  IF NOT EXISTS (SELECT 1 FROM commentsTable WHERE comment_id = @comment_id AND user_id = @user_id)
  BEGIN
    RAISERROR('Comment not found.', 16, 1);
    RETURN;
  END;

  -- Delete the comment from commentsTable
  DELETE FROM commentsTable
  WHERE comment_id = @comment_id;
END;
