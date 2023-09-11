USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS GetFollowersPROC;
-- GO

CREATE OR ALTER PROCEDURE GetFollowersPROC
  @user_id VARCHAR(255)
AS
BEGIN
  -- Retrieve the list of users who are following the specified user
  SELECT follower_id
  FROM followersTable
  WHERE following_id = @user_id;
END;