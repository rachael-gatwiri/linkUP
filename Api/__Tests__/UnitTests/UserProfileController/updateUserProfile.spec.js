//unit testing for updateUserProfile

const mssql = require('mssql');
const { updateUserProfile } = require('../../../Controllers/userProfile.Controller');

describe('Checking fields for updateUserProfile', () => {
    it('should throw an error if no userId is provided', async () => {
        const req = {
            params: {
                userId: ''
            },
            body: {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@gmail.com',
                profilePicture: 'test.jpg'
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await updateUserProfile(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'User ID is required' })
})

it('should throw an error if any field is empty', async () => {
    const req = {
        params: {
            userId: 1
        },
        body: {
            firstName: 'test',
            lastName: 'User',
            email: '',
            profilePicture: 'test.jpg'
        }
    }
    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }
    await updateUserProfile(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'first name, last name and profile image are required' })
})
})


 describe('Checking if the user profile is updated', () => {

    it('should update the user profile if the user is found', async () => {
        const req = {
            params: {
                userId: 1
            },
            body: {
                first_name: 'Test',
                last_name: 'User',
                profile_image_url: 'test.jpg'
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        const mockresult = {
            rowsAffected: [1]
        }
       jest.spyOn(mssql, 'connect').mockImplementation(() => ({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValue(mockresult)
        })) 
        
        await updateUserProfile(req, res)
        // expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: 'User profile edited successfully' })
})
})

