-- Create a stored procedure to get a user's posts
USE Linkup
GO

DROP PROCEDURE IF EXISTS getUserPostsPROC;
GO

CREATE PROCEDURE getUserPostsPROC
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

  -- Retrieve the user's posts from postsTable
  SELECT *
  FROM postsTable
  WHERE user_id = @user_id;
END;
