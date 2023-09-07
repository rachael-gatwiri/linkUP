-- Create a stored procedure to add a comment on a post or comment
USE Linkup
GO

DROP PROCEDURE IF EXISTS addCommentPROC;
GO

CREATE PROCEDURE addCommentPROC
  @user_id VARCHAR(255),
  @post_id INT,
  @parent_comment_id INT,
  @content TEXT,
  @comment_image_url VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the user_id exists in the usersTable (foreign key constraint check)
  IF NOT EXISTS (SELECT 1 FROM usersTable WHERE id = @user_id)
  BEGIN
    RAISERROR('User not found.', 16, 1);
    RETURN;
  END;

  -- Check if the post_id exists in the postsTable (foreign key constraint check)
  IF NOT EXISTS (SELECT 1 FROM postsTable WHERE post_id = @post_id)
  BEGIN
    RAISERROR('Post not found.', 16, 1);
    RETURN;
  END;

  -- Check if the parent_comment_id is valid (NULL for top-level comments or references a valid comment)
  IF @parent_comment_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM commentsTable WHERE comment_id = @parent_comment_id)
  BEGIN
    RAISERROR('Parent comment not found.', 16, 1);
    RETURN;
  END;

  -- Insert the comment into commentsTable
  INSERT INTO commentsTable (user_id, post_id, parent_comment_id, content, comment_image_url)
  VALUES (@user_id, @post_id, @parent_comment_id, @content, @comment_image_url);
  
  -- Optionally, you can return the newly created comment_id if needed
  SELECT SCOPE_IDENTITY() AS new_comment_id;
END;
