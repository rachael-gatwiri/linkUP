-- Create a procedure to get a user's profile by their ID
USE Linkup
GO

DROP PROCEDURE IF EXISTS getUserProfileProc;
GO

CREATE PROCEDURE getUserProfileProc
  @UserId VARCHAR(255)
AS
BEGIN
  SELECT
    id AS user_id,
    first_name,
    last_name,
    username,
    profile_image_url
  FROM
    usersTable
  WHERE
    id = @UserId;
END;
