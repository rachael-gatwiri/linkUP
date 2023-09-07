Z-- Create a stored procedure to get a user's followers and following
USE Linkup
GO

DROP PROCEDURE IF EXISTS getFollowersAndFollowingPROC;
GO

CREATE PROCEDURE getFollowersAndFollowingPROC
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

  -- Retrieve the user's followers and following from followersTable
  SELECT
    u.id AS user_id,
    u.first_name AS user_first_name,
    u.last_name AS user_last_name,
    f.id AS follower_id,
    f.first_name AS follower_first_name,
    f.last_name AS follower_last_name
  FROM followersTable AS ft
  JOIN usersTable AS u ON ft.user_id = u.id
  JOIN usersTable AS f ON ft.follower_user_id = f.id
  WHERE ft.user_id = @user_id;
END;
