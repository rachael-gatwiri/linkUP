// Unit testing for getPostByPostId

const mssql = require('mssql')
const {getPostByPostId} = require('../../../Controllers/Posts.Controller')

describe('Checking if the post exists', () => {
    it('should show the post if the post exists', async () => {
        const req = {
            params: {
                postId: '1'
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