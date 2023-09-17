//login  unit test
const mssql = require('mssql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {login} = require('../../../Controllers/Auth.Controller')

describe('Checking All fields', () => {
    it('should return an error if all fieldss are empty', async () => {
        const req = {
            body: {
                email: '',
                password: ''
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'The request body can not be empty'})
    })

    it('should return an error if email is empty', async () => {
        const req = {
            body: {
                email: '',
                password: '123456'
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'The request body can not be empty'})
    })

    it('should return an error if password is empty', async () => {
        const req = {
            body: {
                email: 'test@gmail.com',
                password: ''
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }

        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'The request body can not be empty'})
    })
});

describe('Checking Credentials', () => {
    it('should return an error if email is invalid', async () => {
        const req = {
            body: {
                email: 'test1234567@gmail.com',
                password: '123456'
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'This email is not registered'})
    })

    it('should return an error if password is incorrect', async () => {
        const req = {
            body: {
                email: 'test@gmail.com',
                password: '1234567'
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }

        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Password is incorrect'})
    })
    
    it('should login the user successfully', async () => {
        const mockUser = { 
            firstName: 'test',
            lastName: 'tset',
            email: 'testing@gmail.com',
            password: await bcrypt.hash('Tester1234.', 10),

        }
        const req = {
            body: {
                email: 'testing@gmail.com',
                password : 'Tester1234.'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        
        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1],
                recordset: [mockUser]
            })
        })
    
        jest.spyOn(jwt, 'sign').mockReturnValueOnce('token')
    
    
        const {password, ...user} = mockUser
        await login(req, res) 
    
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message: 'Login successful', token: 'token', user})
    })
})