-- Create a stored procedure to edit a post
USE Linkup
GO

DROP PROCEDURE IF EXISTS editPostPROC;
GO

CREATE PROCEDURE editPostPROC
  @post_id INT,
  @user_id VARCHAR(255),
  @content TEXT,
  @post_image_url VARCHAR(255)
AS
BEGIN
  -- SET NOCOUNT ON;

  -- Check if the user_id exists in the usersTable (foreign key constraint check)
  IF NOT EXISTS (SELECT 1 FROM usersTable WHERE id = @user_id)
  BEGIN
    RAISERROR('User not found.', 16, 1);
    RETURN;
  END;

  -- Check if the post_id exists in the postsTable and is owned by the user
  IF NOT EXISTS (SELECT 1 FROM postsTable WHERE post_id = @post_id AND user_id = @user_id)
  BEGIN
    RAISERROR('Post not found', 16, 1);
    RETURN;
  END;

  -- Update the post in postsTable
  UPDATE postsTable
  SET content = @content,
      post_image_url = @post_image_url
  WHERE post_id = @post_id;
END;
