//Registration Controller Unit Test

const mssql = require('mssql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { userRegistration } = require('../../../Controllers/Auth.Controller');
const {sqlConfig} = require('../../../Config/config')

describe('Checking All fields', () => {
it('should return an error if all fields are empty', async () => {
    const req = {
        body: {
           
        }
    }
    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }
    await userRegistration(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({error: 'Please input all values'})
})

it('should return an error if firstName is empty', async () => {
    const req = {
        body: {
            firstName: '',
            lastName: 'test',
            username: 'test',
            email: 'test@gmail.com',
            password: 'test12345.'
        }
    }

    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }
    await userRegistration(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({error: 'Please input all values'})
})

it('should return an error if lastName is empty', async () => {
    const req = {
        body: {
            firstName: 'test',
            lastName: '',
            username: 'test',
            email: 'test@gmail.com',
            password: 'test12345.'
        }
    }

    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }
    await userRegistration(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({error: 'Please input all values'})
})

it('should return an error if username is empty', async () => {
    const req = {
        body: {
            firstName: 'test',
            lastName: 'test',
            username: '',
            email: 'test@gmail.com',
            password: 'test12345.'
        }   
    }

    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }

    await userRegistration(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({error: 'Please input all values'})
})

it('should return an error if email is empty', async () => {
    const req = {
        body: {
            firstName: 'test',
            lastName: 'test',
            username: 'test',
            email: '',
            password: 'test12345.'
        }
    }

    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }

    await userRegistration(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({error: 'Please input all values'})
})

it('should return an error if password is empty', async () => {
    const req = {
        body: {
            firstName: 'test',
            lastName: 'test',
            username: 'test',
            email: 'test@gmail.com',
            password: ''
        }
    }

    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }

    await userRegistration(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({error: 'Please input all values'})
})
})

describe('Checking if email is already registered', () => {
it('should return an error if email is already registered', async () => {
    const req = {
        body: {
            firstName: 'test',
            lastName: 'test',
            username: 'test',
            email: 'test@gmail.com',
            password: 'test12345.'
        }
    }

    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }

    await userRegistration(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({error: 'Account creation failed! This email is already registered'})
})
})

describe('Should register user successfully', () => {
    it('should register user successfully', async () => {

        const req = {
            body: {
                firstName: 'test',
                lastName: 'test',
                username: 'testing15',
                email: 'testing15@gmail.com',
                password: "Test1234."
            },
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [0]
            })
        })
        jest.spyOn (bcrypt, 'hash').mockResolvedValueOnce('Test1234.')
        jest.spyOn(jwt, 'sign').mockResolvedValueOnce('token') // Mock jwt.sign to resolve with 'token'
     
        await userRegistration(req, res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({message: 'Account created successfully', token : 'token'}) // Expect 'token' here
    })
})
