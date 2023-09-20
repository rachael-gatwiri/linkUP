//Unit testing for editPost

const mssql = require('mssql');
const { editPost } = require('../../../Controllers/Posts.Controller');

describe('Checking fields for editPost', () => {
    it('should throw an error if no post_id is provided', async () => {
        const req = {
            body: {
                postId: 1,
                userId: 1,
                content: 'This is a test post',
                postImage: 'test.png',
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await editPost(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'User ID, post ID, and content are required' })
    })

    it('should throw an error if no user_id is provided', async () => {
        const req = {
            params: {
                postId: 1
            },
            body: {
                content: 'This is a test post',
                postImage: 'test.png',
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await editPost(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'User ID, post ID, and content are required' })
    })

    it('should throw an error if no content is provided', async () => {
        const req = {
            params: {
                postId: 1
            },
            body: {
                userId: 1,
                postImage: 'test.png',
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await editPost(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'User ID, post ID, and content are required' })
    })

    it('should throw an error if the body is empty', async () => {
        const req = {
            params: {
                postId: 1
            },
            body: {}
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await editPost(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'User ID, post ID, and content are required' })
    })
});

describe('Checking if the post exists', () => {
    it('should throw an error if the post fails to update', async() => {
        const req = {
            params: {
                postId: 1
            },
            body: {
                userId: 1,
                content: 'This is a test post',
                postImage: 'test.png',
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            // request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce(null)
        }) 

        await editPost(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to update the post' })
    })

    it('should update the post successfully', async() => {
        const req = {
            params: {
                postId: 1
            },
            body: {
                userId: 1,
                content: 'This is a test post',
                postImage: 'test.png',
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        const mockResult = {
            rowsAffected: [1]
        }
        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce(mockResult)
        }) 

        await editPost(req, res)
        // expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: 'Post updated successfully' })
    })
});