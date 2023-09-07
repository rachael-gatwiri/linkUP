-- Create a stored procedure to fetch comments for a specific post
USE Linkup
GO  

DROP PROCEDURE IF EXISTS getCommentsByPostPROC;
GO

CREATE PROCEDURE getCommentsByPostPROC
  @post_id INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the post_id exists in the postsTable (foreign key constraint check)
  IF NOT EXISTS (SELECT 1 FROM postsTable WHERE post_id = @post_id)
  BEGIN
    RAISERROR('Post not found.', 16, 1);
    RETURN;
  END;

  -- Fetch all comments for the specified post
  SELECT
    CT.comment_id,
    CT.user_id,
    CT.post_id,
    CT.comment_image_url,
    CT.parent_comment_id,
    CT.content,
    CT.created_at,
    UT.first_name AS commenter_first_name,
    UT.last_name AS commenter_last_name
  FROM
    commentsTable AS CT
  LEFT JOIN
    usersTable AS UT
  ON
    CT.user_id = UT.id
  WHERE
    CT.post_id = @post_id;
END;
