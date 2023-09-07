-- Create a stored procedure to follow another user
USE Linkup
GO

DROP PROCEDURE IF EXISTS followUserPROC;
GO

CREATE PROCEDURE followUserPROC
  @user_id VARCHAR(255),
  @follower_user_id VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the user_id and follower_user_id exist in the usersTable (foreign key constraint checks)
  IF NOT EXISTS (SELECT 1 FROM usersTable WHERE id = @user_id)
  BEGIN
    RAISERROR('User not found.', 16, 1);
    RETURN;
  END;

  IF NOT EXISTS (SELECT 1 FROM usersTable WHERE id = @follower_user_id)
  BEGIN
    RAISERROR('Follower user not found.', 16, 1);
    RETURN;
  END;

  -- Check if the user is already being followed by the follower_user
  IF EXISTS (SELECT 1 FROM followersTable WHERE user_id = @user_id AND follower_user_id = @follower_user_id)
  BEGIN
    RAISERROR('User is already being followed by this user', 16, 1);
    RETURN;
  END;

  -- Insert the follow relationship into followersTable
  INSERT INTO followersTable (user_id, follower_user_id)
  VALUES (@user_id, @follower_user_id);
END;
