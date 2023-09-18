USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS GetFollowersPROC;
-- GO

CREATE OR ALTER PROCEDURE GetFollowersPROC
  @user_id VARCHAR(255)
AS
BEGIN
  -- Retrieve the list of users who are following the specified user
  SELECT 
  f.follower_id,
  u.first_name,
  u.last_name,
  u.username,
  u.profile_image_url
  FROM followersTable f
  JOIN usersTable u ON f.follower_id = u.id
  WHERE following_id = @user_id;
END;

