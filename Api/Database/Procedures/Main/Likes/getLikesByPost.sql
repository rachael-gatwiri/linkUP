USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS GetLikesForPostProc;
-- GO

CREATE OR ALTER PROCEDURE GetLikesForPostProc
  @post_id INT
AS
BEGIN
  -- Retrieve all likes for the specified post
  SELECT user_id
  FROM likesTable
  WHERE post_id = @post_id;
END;
