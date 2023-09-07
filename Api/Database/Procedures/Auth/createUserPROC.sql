USE linkup;
GO

-- DROP PROCEDURE IF EXISTS createNewUserPROC;
-- GO

CREATE OR ALTER PROCEDURE createNewLinkUpUserPROC(@id VARCHAR(255), @first_name VARCHAR(255), @last_name VARCHAR(255), @username VARCHAR(255), @email VARCHAR(255), @password VARCHAR(MAX))
AS
BEGIN
    INSERT INTO usersTable(id, first_name, last_name, username, email, password)
    VALUES(@id, @first_name, @last_name, @username, @email, @password)
END
GO

