USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS GetFollowingPROC;
-- GO

CREATE OR ALTER PROCEDURE GetFollowingPROC
  @user_id VARCHAR(255)
AS
BEGIN
  -- Retrieve the list of users followed by the specified user
  SELECT 
    f.following_id,
    u.first_name,
    u.last_name,
    u.username,
    u.profile_image_url
  FROM followersTable f
  JOIN usersTable u ON f.following_id = u.id
  WHERE follower_id = @user_id;
END;


