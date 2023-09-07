-- Create a procedure to update a user's profile by their ID
USE Linkup
GO

DROP PROCEDURE IF EXISTS updateUserProfileProc;
GO

CREATE PROCEDURE updateUserProfileProc
  @userId VARCHAR(255),
  @firstName VARCHAR(255),
  @lastName VARCHAR(255),
  @profileImageUrl VARCHAR(255)
AS
BEGIN
  UPDATE usersTable
  SET
    first_name = @firstName,
    last_name = @lastName
  WHERE
    id = @UserId;

  -- Update the profile image URL if provided
  IF @profileImageUrl IS NOT NULL
  BEGIN
    UPDATE usersTable
    SET
      profile_image_url = @profileImageUrl
    WHERE
      id = @UserId;
  END;

  -- Return the updated user information
  SELECT
    id AS user_id,
    first_name,
    last_name,
    profile_image_url
  FROM
    usersTable
  WHERE
    id = @UserId;
END;
