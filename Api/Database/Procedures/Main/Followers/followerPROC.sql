USE Linkup;
GO

-- DROP PROCEDURE IF EXISTS FollowUnfollowUserPROC;
-- GO

CREATE OR ALTER PROCEDURE FollowUnfollowUserPROC
  @action VARCHAR(10), -- 'follow' or 'unfollow'
  @follower_id VARCHAR(255),
  @following_id VARCHAR(255)
AS
BEGIN
  BEGIN TRY
    IF @action = 'follow'
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM FollowersTable
        WHERE follower_id = @follower_id AND following_id = @following_id
      )
      BEGIN
        INSERT INTO FollowersTable (follower_id, following_id) VALUES (@follower_id, @following_id);
      END
      ELSE
      BEGIN
        RETURN 1;
      END
    END
    ELSE IF @action = 'unfollow'
    BEGIN
      IF EXISTS (
        SELECT 1 FROM FollowersTable
        WHERE follower_id = @follower_id AND following_id = @following_id
      )
      BEGIN
        DELETE FROM FollowersTable WHERE follower_id = @follower_id AND following_id = @following_id;
      END
      ELSE
      BEGIN
        RETURN 2;
      END
    END
  END TRY
  BEGIN CATCH
    RETURN 3; 
  END CATCH;
END;
GO
