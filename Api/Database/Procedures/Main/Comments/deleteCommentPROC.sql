USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS DeleteCommentProc;
-- GO

CREATE OR ALTER PROCEDURE DeleteCommentProc
  @comment_id INT,
  @user_id VARCHAR(255)
AS
BEGIN
  BEGIN TRY
    -- Disable the foreign key constraint temporarily
    ALTER TABLE commentsTable NOCHECK CONSTRAINT FK__commentsT__paren__5AD97420;

    -- Delete the comment and its child comments recursively
    WITH CommentCTE AS (
      SELECT comment_id
      FROM commentsTable
      WHERE comment_id = @comment_id

      UNION ALL

      SELECT c.comment_id
      FROM CommentCTE AS p
      INNER JOIN commentsTable AS c ON p.comment_id = c.parent_comment_id
    )
    DELETE FROM commentsTable
    WHERE comment_id IN (SELECT comment_id FROM CommentCTE);

    -- Re-enable the foreign key constraint
    ALTER TABLE commentsTable CHECK CONSTRAINT FK__commentsT__paren__5AD97420;

    -- Check if any rows were affected by the delete
    DECLARE @rowsAffected INT;
    SET @rowsAffected = @@ROWCOUNT;

    IF @rowsAffected > 0
    BEGIN
      RETURN 0; -- Success
    END
    ELSE
    BEGIN
      RETURN 1; -- Comment not found or permission denied
    END
  END TRY
  BEGIN CATCH
    -- Handle any errors that occur during the deletion
    RETURN 2; -- Internal server error
  END CATCH;
END;



