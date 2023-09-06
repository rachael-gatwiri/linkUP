USE Linkup
GO

DROP PROCEDURE IF EXISTS genPwdResetTokenPROC;
GO

CREATE PROCEDURE genPwdResetTokenPROC
    @email VARCHAR(255),
    @token VARCHAR(500) OUTPUT
AS
BEGIN
    DECLARE @newToken VARCHAR(500);
    SET @newToken = CONVERT(VARCHAR(500), NEWID()); -- Generate a random token

    -- Update the user's token in the database
    UPDATE usersTable
    SET token = @newToken
    WHERE email = @email;

    SET @token = @newToken;
END;

