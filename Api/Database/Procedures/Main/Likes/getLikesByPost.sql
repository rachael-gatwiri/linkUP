-- Create a stored procedure to get likes by post ID
USE Linkup;
GO

DROP PROCEDURE IF EXISTS GetLikesByPostProc;
GO

CREATE PROCEDURE GetLikesByPostProc
  @post_id INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the post_id exists in the postsTable (foreign key constraint check)
  IF NOT EXISTS (SELECT 1 FROM postsTable WHERE post_id = @post_id)
  BEGIN
    RAISERROR('Post not found.', 16, 1);
    RETURN;
  END;

  -- Retrieve likes by post_id from likesTable
  SELECT * FROM likesTable WHERE post_id = @post_id;
END;
