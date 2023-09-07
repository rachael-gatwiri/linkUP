USE Linkup
GO

DROP PROCEDURE IF EXISTS checkEmailExistencePROC;
GO
    
CREATE PROCEDURE checkEmailExistencePROC
    @email VARCHAR(255),
    @exists BIT OUTPUT
AS
BEGIN
    SET @exists = 0;

    IF EXISTS (SELECT 1 FROM usersTable WHERE email = @email)
    BEGIN
        SET @exists = 1;
    END;
END;
