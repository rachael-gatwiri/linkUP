//forgot password unit tests
const mssql = require('mssql')
const { forgotPassword } = require('../../../Controllers/Auth.Controller')
const nodemailer = require('nodemailer')

describe('Checking All fields', () => {
    it('should return an error if email field is empty', async () => {
        const req = {
            body: {
                email: ''
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await forgotPassword(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'Please input your email' })
    })
})

describe('Checking Credentials', () => {
    it('should return an error if user does not exist', async () => {
        const req = {
            body: {
                email: 'test@gmail.com'
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        const mockuser = {
            recordset: []
        }

        jest.spyOn(mssql, 'connect').mockImplementation(() => {
            return {
                request : jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue({
                    recordset: []
                })
            }
        })
       
        await forgotPassword(req, res)
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ error: 'Email not found' })
    })

    it('should send an email successfully if email exists', async () => {
        const email = 'rachaeltems@gmail.com';  
    
        const req = {
            body: {
                email: email,
            },
        };
    
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        const transporter = {
            sendMail: jest.fn().mockImplementationOnce((mailOptions, callback) => {
                callback(null, true);
            }),
            createTransport: jest.fn().mockReturnValue({
                sendMail: jest.fn().mockImplementationOnce((mailOptions, callback) => {
                    callback(null, true);
                }),
            }),
        };
    
        jest.spyOn(nodemailer, 'createTransport').mockReturnValue(transporter);
        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [{ email: 'rachaeltems@gmail.com' }],
            }),
        });
    
        await forgotPassword(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
       expect(res.json).toHaveBeenCalledWith({ message: 'Email sent successfully' });
    });    
})