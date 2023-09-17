// get user by email unit tests

const mssql = require('mssql');
const sqlConfig = require('../../../Config/config');
const { getUserByEmail } = require('../../../Controllers/Auth.Controller');

describe('getting user by email', () => {
    it('should get user by email', async () => {
        const mockUser = {
            email: 'test@gmail.com'
        }
        const req = {
            body: {
                email: 'test@gmail.com'
            }
        }

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [mockUser]
            })
        }) 

        await getUserByEmail(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    })
})