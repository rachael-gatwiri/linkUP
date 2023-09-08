-- Create a stored procedure to create a new post
USE Linkup
GO

-- DROP PROCEDURE IF EXISTS CreateNewPostPROC;
-- GO

CREATE OR ALTER PROCEDURE CreateNewPostPROC
  @user_id VARCHAR(255),
  @content TEXT,
  @post_image_url VARCHAR(255)
AS
BEGIN
  -- SET NOCOUNT ON;

  -- Check if the user_id exists in the usersTable (foreign key constraint check)
  IF NOT EXISTS (SELECT 1 FROM usersTable WHERE id = @user_id)
  BEGIN
  RAISERROR('User not found.', 16, 1);
    RETURN;
  END;

  -- Insert the new post into postsTable
  INSERT INTO postsTable (user_id, content, post_image_url)
  VALUES (@user_id, @content, @post_image_url);
  
  -- Optionally, you can return the newly created post_id if needed
  SELECT SCOPE_IDENTITY() AS new_post_id;
END;
