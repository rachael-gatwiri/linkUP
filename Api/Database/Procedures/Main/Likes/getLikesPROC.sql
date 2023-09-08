-- Create a stored procedure to get all likes
USE Linkup;
GO

DROP PROCEDURE IF EXISTS GetLikesPROC;
GO

CREATE PROCEDURE GetLikesPROC
AS
BEGIN
  SET NOCOUNT ON;

  -- Retrieve all likes from likesTable
  SELECT * FROM likesTable;
END;
