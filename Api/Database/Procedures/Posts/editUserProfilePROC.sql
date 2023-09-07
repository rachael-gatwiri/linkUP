-- Create a stored procedure to edit a user's profile
USE Linkup
GO

DROP PROCEDURE IF EXISTS editUserProfilePROC;
GO

CREATE PROCEDURE editUserProfilePROC
  @user_id VARCHAR(255),
  @first_name VARCHAR(255),
  @last_name VARCHAR(255),
  @profile_image_url VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the user_id exists in the usersTable (foreign key constraint check)
  IF NOT EXISTS (SELECT 1 FROM usersTable WHERE id = @user_id)
  BEGIN
    RAISERROR('User not found.', 16, 1);
    RETURN;
  END;

  -- Update the user's profile in usersTable
  UPDATE usersTable
  SET first_name = @first_name,
      last_name = @last_name,
      profile_image_url = @profile_image_url
  WHERE id = @user_id;
END;
