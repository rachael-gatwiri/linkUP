//unit testing for getUserProfile

const mssql = require('mssql');
const { getUserProfile } = require('../../../Controllers/userProfile.Controller');

describe('Checking if the user profile is fetched', () => {

    it('should show the user profile if the user is found', async () => {
        const req = {
            params: {
                userId: 1
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        const mockResult = {
            recordset: [
                {
                    user_id: 1,
                    first_name: 'Test',
                    last_name: 'User',
                    email: 'test@gmail.com',
                    profile_picture: 'test.jpg'
                }
            ]
        }

        jest.spyOn(mssql, 'connect').mockImplementation(() => Promise.resolve({
            request: () => ({
                input: () => ({
                    execute: () => Promise.resolve(mockResult)
                })
            })  
        }))
        await getUserProfile(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(mockResult.recordset[0])  
    })
})