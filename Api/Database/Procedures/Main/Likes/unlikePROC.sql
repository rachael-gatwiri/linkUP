USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS RemoveLikeFromPostProc;
-- GO

CREATE OR ALTER PROCEDURE RemoveLikeFromPostProc
  @user_id VARCHAR(255),
  @post_id INT
AS
BEGIN
  -- Check if the user has liked the post
  IF EXISTS (SELECT 1 FROM likesTable WHERE user_id = @user_id AND post_id = @post_id)
  BEGIN
    -- Delete the like from the likesTable
    DELETE FROM likesTable
    WHERE user_id = @user_id AND post_id = @post_id;
    
    -- Return a success message
    SELECT 'Like removed successfully' AS message;
  END
  ELSE
  BEGIN
    -- Return a message indicating that the user has not liked the post
    SELECT 'User has not liked the post' AS message;
  END;
END;
