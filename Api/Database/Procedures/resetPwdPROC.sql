USE Linkup
GO

DROP PROCEDURE IF EXISTS resetPwdPROC
GO

CREATE PROCEDURE resetPwdPROC
    @email VARCHAR(255),
    @token VARCHAR(500),
    @newPassword VARCHAR(255)
AS
BEGIN
    -- Check if the provided token matches the token in the database
    IF EXISTS (SELECT 1 FROM usersTable WHERE email = @email AND token = @token)
    BEGIN
        -- Reset the password for the user
        UPDATE usersTable
        SET password = @newPassword,
            token = '' -- Clear the token after resetting the password
        WHERE email = @email;

        -- Return a success message
        SELECT 'Password reset successfully.' AS message;
    END
    ELSE
    BEGIN
        -- Token does not match or expired
        SELECT 'Invalid or expired token. Please request a new password reset.' AS message;
    END;
END;
