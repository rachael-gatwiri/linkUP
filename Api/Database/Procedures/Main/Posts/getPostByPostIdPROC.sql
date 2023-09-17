-- Create a stored procedure to get a user's posts
USE Linkup
GO

-- DROP PROCEDURE IF EXISTS getPostByPostIdPROCC;
-- GO

CREATE OR ALTER PROCEDURE getPostByPostIdPROC
  @post_id VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the user_id exists in the usersTable (foreign key constraint check)
  IF NOT EXISTS (SELECT 1 FROM postsTable WHERE post_id = @post_id)
  BEGIN
    RAISERROR('Post not found.', 16, 1);
    RETURN;
  END;

  -- Retrieve the user's posts from postsTable
  SELECT *
  FROM postsTable
  WHERE post_id = @post_id;
END;


  