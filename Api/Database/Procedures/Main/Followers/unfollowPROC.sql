USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS UnfollowUserPROC;
-- GO

CREATE OR ALTER PROCEDURE UnfollowUserPROC
  @follower_id VARCHAR(255),
  @following_id VARCHAR(255)
AS
BEGIN
  -- Delete the relationship if it exists
  DELETE FROM followersTable
  WHERE follower_id = @follower_id AND following_id = @following_id;
END;
