-- get followers by Id proc
USE Linkup;
GO

DROP PROCEDURE IF EXISTS getFollowersByIdPROC;
GO

CREATE OR ALTER PROCEDURE getFollowersByIdPROC
   @follower_id VARCHAR(255)
AS
BEGIN
 SET NOCOUNT ON;

    -- Check if the user_id exists in the usersTable (foreign key constraint check)
    IF NOT EXISTS (SELECT 1 FROM followersTable WHERE follower_id = @follower_id)
    BEGIN
      RAISERROR('Follower not found.', 16, 1);
      RETURN;
    END;

    -- Retrieve the user's posts from postsTable
    SELECT *
    FROM followersTable
    WHERE follower_id = @follower_id;
END;
GO

