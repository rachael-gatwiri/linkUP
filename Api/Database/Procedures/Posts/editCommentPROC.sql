-- Create a stored procedure to edit a comment
USE Linkup
GO

DROP PROCEDURE IF EXISTS editCommentPROC;
GO

CREATE PROCEDURE editCommentPROC
  @comment_id INT,
  @user_id VARCHAR(255),
  @content TEXT,
  @comment_image_url VARCHAR(255)
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
    RAISERROR('Comment not found or user does not own the comment.', 16, 1);
    RETURN;
  END;

  -- Update the comment in commentsTable
  UPDATE commentsTable
  SET content = @content,
      comment_image_url = @comment_image_url
  WHERE comment_id = @comment_id;
END;
