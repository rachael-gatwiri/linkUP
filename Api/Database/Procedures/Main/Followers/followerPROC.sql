USE Linkup;
GO

DROP PROCEDURE IF EXISTS followUserPROC;
GO

CREATE OR ALTER PROCEDURE followUserPROC
  @follower_id VARCHAR(255),
  @following_id VARCHAR(255)
AS
BEGIN
  -- Check if the relationship already exists to avoid duplicates
  IF NOT EXISTS (SELECT 1 FROM followersTable WHERE follower_id = @follower_id AND following_id = @following_id)
  BEGIN
    INSERT INTO followersTable (follower_id, following_id)
    VALUES (@follower_id, @following_id);
  END;
END;
