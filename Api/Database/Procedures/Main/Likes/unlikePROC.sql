-- Create a stored procedure to unlike a post
USE Linkup
GO

DROP PROCEDURE IF EXISTS UnlikePostPROC;
GO

CREATE PROCEDURE UnlikePostPROC
  @user_id VARCHAR(255),
  @post_id INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the user_id exists in the usersTable (foreign key constraint check)
  IF NOT EXISTS (SELECT 1 FROM usersTable WHERE id = @user_id)
  BEGIN
    RAISERROR('User not found.', 16, 1);
    RETURN;
  END;

  -- Check if the post_id exists in the postsTable (foreign key constraint check)
  IF NOT EXISTS (SELECT 1 FROM postsTable WHERE post_id = @post_id)
  BEGIN
    RAISERROR('Post not found.', 16, 1);
    RETURN;
  END;

  -- Check if the user has already unliked the post
  IF NOT EXISTS (SELECT 1 FROM likesTable WHERE user_id = @user_id AND post_id = @post_id)
  BEGIN
    RAISERROR('User has not liked the post.', 16, 1);
    RETURN;
  END;

  -- Delete the like from likesTable
  DELETE FROM likesTable WHERE user_id = @user_id AND post_id = @post_id;
END;
