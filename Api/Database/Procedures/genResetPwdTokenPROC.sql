USE Linkup
GO

DROP PROCEDURE IF EXISTS genPwdResetTokenPROC;
GO

CREATE PROCEDURE genPwdResetTokenPROC
    @email VARCHAR(255),
    @token VARCHAR(MAX) OUTPUT
AS
BEGIN
    UPDATE usersTable
    SET token = @token
    WHERE email = @email;

    SET @token = @token;
END;

