USE Linkup;
GO

CREATE OR ALTER PROCEDURE DeleteCommentProc
  @comment_id INT
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
      -- Successfully deleted
      RETURN 0;
    END
    ELSE
    BEGIN
      -- Comment not found
      RETURN 1;
    END
  END TRY
  BEGIN CATCH
    -- Handle specific error cases
    IF ERROR_NUMBER() = 547
    BEGIN
      -- Constraint violation (e.g., foreign key)
      RETURN 3;
    END
    ELSE
    BEGIN
      -- Other unexpected errors
      RETURN 2;
    END;
  END CATCH;
END;
GO
