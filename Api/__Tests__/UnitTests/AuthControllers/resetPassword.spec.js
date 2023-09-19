const {resetPassword} = require('../../../Controllers/Auth.Controller')
const mssql = require('mssql');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

describe('Checking fields', () => {
    it('should fail when the request body is empty', async () => {
        const req = {
            body: {}
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await resetPassword(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Token and newPassword are required'})
    })
});

describe('Checking Credentials', () => {
    it('should fail when the token is invalid', async () => {
        const req = {
            body : {
                newPassword: 'Test1234.',
                token: 'token'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const decodedToken = {
            email: 'test@gmail.com',
        }
        const token = jwt.sign(decodedToken, process.env.SECRET_KEY)
        jest.spyOn(jwt, 'verify').mockImplementation()
        await resetPassword(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Invalid or expired token. Please request a new password reset.'})
    })

    it('should pass if reset password is successful', async () => {
        const req = {
            body: {
                newPassword: 'Test1234.',
                token: 'token'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const result = {
            rowsAffected: [1]
        };
        const pool = {
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockReturnThis()
        };
        const hashedPassword = 'hashedPassword';
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.newPassword, salt);
        const decodedToken = {
            email: 'rachaeltems@gmail.com'
        };
        const token = jwt.sign(decodedToken, process.env.SECRET_KEY);
        jest.spyOn(mssql, 'connect').mockImplementation(() => Promise.resolve(pool));
        jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve(hashedPassword));
        jest.spyOn(bcrypt, 'genSalt').mockImplementation(() => Promise.resolve(salt));
        jest.spyOn(jwt, 'verify').mockImplementation(() => decodedToken);

        pool.execute.mockResolvedValue(result);

        await resetPassword(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({message: 'Password reset successfully.'});
    });

    it('should fail if reset password is unsuccessful', async () => {
        const req = {
            body : {
                newPassword: 'Test1234.',
                token: 'token'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const result = {
            rowsAffected: [0]
        }
        const pool = {
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockReturnThis()
        }

        const decodedToken = {
            email: 'test@gmail.com',
        }
        const token = jwt.sign(decodedToken, process.env.SECRET_KEY)
        jest.spyOn(mssql, 'connect').mockImplementation(() => Promise.resolve(pool))
        jest.spyOn(jwt, 'verify').mockImplementation(() => decodedToken)

        pool.execute.mockResolvedValue(result)

        await resetPassword(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Password reset failed. Please request a new password reset.'})
    });
})







   
