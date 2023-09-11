USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS AddLikeToPostProc;
-- GO

CREATE OR ALTER PROCEDURE AddLikeToPostProc
  @user_id VARCHAR(255),
  @post_id INT
AS
BEGIN
  -- Check if the user has already liked the post
  IF NOT EXISTS (SELECT 1 FROM likesTable WHERE user_id = @user_id AND post_id = @post_id)
  BEGIN
    -- Insert a new like into the likesTable
    INSERT INTO likesTable (user_id, post_id)
    VALUES (@user_id, @post_id);
    
    -- Return a success message or any other data as needed
    SELECT 'Like added successfully' AS message;
  END
  ELSE
  BEGIN
    -- Return a message indicating that the user has already liked the post
    SELECT 'User has already liked the post' AS message;
  END;
END;

