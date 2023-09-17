//testing forgot password controller

const mssql = require('mssql')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const {forgotPassword} = require('../../../Controllers/Auth.Controller')

DOMException
describe('Checking all fields', () => {
    it('should fail when the request body is empty', async () => {
        const req = {
            body: {}
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await forgotPassword(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Please input your email'})
    })
})

describe('Checking Credentials', () => {
it(('Should fail when the email is not in the registered'), async () => {
        const req = {
            body: {
                email: 'fail@gmail.com'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await forgotPassword(req, res)
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({error: 'Email not found'})
})
it ('should send a reset password link to the email if user is registered', async () => {
    const req = {
        body: {
            email: 'test@gmail.com'
        }
    }
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
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
          recordset: [
            {
              email: 'test@gmail.com',
            }
            ]
        })
    })

  await forgotPassword(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({message: 'Email sent successfully'})
     })
})



