-- Create a stored procedure to delete a post and its related data
USE Linkup
GO

DROP PROCEDURE IF EXISTS deletePostPROC;
GO

CREATE OR ALTER PROCEDURE deletePostPROC
  @post_id INT,
  @user_id VARCHAR(255)
AS
BEGIN
  -- Check if the user_id exists in the usersTable (foreign key constraint check)
  IF NOT EXISTS (SELECT 1 FROM usersTable WHERE id = @user_id)
  BEGIN
    RAISERROR('User not found.', 16, 1);
    RETURN;
  END;

  BEGIN TRANSACTION;

  -- Check if the post exists
  IF NOT EXISTS (SELECT 1 FROM postsTable WHERE post_id = @post_id)
  BEGIN
    ROLLBACK TRANSACTION;
    RAISERROR('Post not found.', 16, 1);
    RETURN;
  END;

  -- Step 1: Delete likes associated with the post
  DELETE FROM likesTable
  WHERE post_id = @post_id;

  -- Step 2: Delete comments associated with the post (including child comments)
  WITH CommentCTE AS (
    SELECT comment_id FROM commentsTable WHERE post_id = @post_id
    UNION ALL
    SELECT c.comment_id FROM CommentCTE cte
    INNER JOIN commentsTable c ON cte.comment_id = c.parent_comment_id
  )
  DELETE FROM commentsTable
  WHERE comment_id IN (SELECT comment_id FROM CommentCTE);

  -- Step 3: Delete the post from postsTable
  DELETE FROM postsTable
  WHERE post_id = @post_id;

  COMMIT TRANSACTION;
END;
