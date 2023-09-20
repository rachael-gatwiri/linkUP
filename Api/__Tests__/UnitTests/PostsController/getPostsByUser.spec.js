//Unit testing for getPostsByUser

const mssql = require('mssql')
const {getPostsByUser} = require('../../../Controllers/Posts.Controller')

describe('Checking if the user exists', () => {
    it('should show the posts if the user exists', async () => {
        const req = {
            params: {
                userId: '1'
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        const mockresult = {
            recordset: [
                {
                    post_id: 1,
                    user_id: 1,
                    content: 'This is a test post',
                    postImage: 'test.png',
                }
            ]
        }

        jest.spyOn(mssql, 'connect').mockImplementation(() => Promise.resolve({
            request: jest.fn(() => Promise.resolve({
                input: jest.fn(() => Promise.resolve({
                    execute: jest.fn(() => Promise.resolve(mockresult))
                }))
            }))
        }))
        })
    })