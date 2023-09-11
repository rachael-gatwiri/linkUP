USE linkup;
GO

CREATE OR ALTER PROCEDURE GetAllUsersProc
AS
BEGIN
  SET NOCOUNT ON;

  -- Retrieve all users from the usersTable
  SELECT *
  FROM usersTable;
END;
