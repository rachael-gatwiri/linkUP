-- Create a stored procedure to check if a user has liked a post
USE Linkup
GO

DROP PROCEDURE IF EXISTS CheckLikeProc;
GO

CREATE PROCEDURE CheckLikeProc
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

  -- Check if the user has liked the post
  IF EXISTS (SELECT 1 FROM likesTable WHERE user_id = @user_id AND post_id = @post_id)
  BEGIN
    -- User has liked the post
    SELECT 1 AS is_liked;
  END
  ELSE
  BEGIN
    -- User has not liked the post
    SELECT 0 AS is_liked;
  END;
END;
