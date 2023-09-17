USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS GetFollowingPROC;
-- GO

CREATE OR ALTER PROCEDURE GetFollowingPROC
  @user_id VARCHAR(255)
AS
BEGIN
  -- Retrieve the list of users followed by the specified user
  SELECT following_id
  FROM followersTable
  WHERE follower_id = @user_id;
END;


