-- Create a stored procedure to get all posts
USE Linkup
GO

DROP PROCEDURE IF EXISTS GetAllPostsProc;
GO

CREATE PROCEDURE GetAllPostsProc
AS
BEGIN
  SET NOCOUNT ON;

  -- Retrieve all posts from the postsTable
  SELECT
    P.post_id,
    P.user_id,
    P.content,
    P.post_image_url,
    P.created_at,
    U.first_name AS user_first_name,
    U.last_name AS user_last_name,
    U.username AS user_username,
    U.profile_image_url AS user_profile_image_url
  FROM postsTable AS P
  JOIN usersTable AS U ON P.user_id = U.id;
END;
