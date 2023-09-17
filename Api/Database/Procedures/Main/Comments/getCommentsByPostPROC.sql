USE Linkup;
GO

CREATE OR ALTER PROCEDURE GetCommentsByPostProc
  @post_id INT
AS
BEGIN
  -- Retrieve comments for the specified post
  SELECT
    c.comment_id,
    c.user_id,
    u.first_name,
    u.last_name,
    u.profile_image_url,
    c.post_id,
    c.parent_comment_id,
    c.comment_text,
    c.created_at
  FROM
    commentsTable c
  JOIN
    usersTable u ON c.user_id = u.id
  WHERE
    c.post_id = @post_id;
END;
