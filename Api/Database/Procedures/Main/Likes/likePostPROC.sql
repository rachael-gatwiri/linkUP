-- Create a stored procedure to like a post
USE Linkup;
GO

DROP PROCEDURE IF EXISTS LikePostPROC;
GO

CREATE PROCEDURE LikePostPROC
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

--   -- Check if the user has already liked the post
IF EXISTS (SELECT 1 FROM likesTable WHERE user_id = @user_id AND post_id = @post_id)
BEGIN
  RAISERROR('User has already liked the post.', 16, 1);
  RETURN;
END;


  -- Insert the like into likesTable
  INSERT INTO likesTable (user_id, post_id)
  VALUES (@user_id, @post_id);
  
  -- Optionally, you can return the newly created like_id if needed
  SELECT SCOPE_IDENTITY() AS new_like_id;
END;
