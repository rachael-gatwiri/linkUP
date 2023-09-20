//Unit testing for deletePost

const mssql = require('mssql');
const { deletePost } = require('../../../Controllers/Posts.Controller');
const { request } = require('express');

describe('Checking fields for deletePost', () => {
    it('Should fail if userId is not provided', async () => {
        const req = {
            params: {
                postId: 1
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await deletePost(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'User ID and post ID are required' });
    })

    it('Should fail if postId is not provided', async () => {
        const req = {
            params: {
                userId: 1
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await deletePost(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'User ID and post ID are required' });
    })

    it('Should fail if userId and postId are not provided', async () => {
        const req = {
            params: {}
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await deletePost(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'User ID and post ID are required' });
    })
})

describe('Checking if the post is deleted', () => {

    it('should delete the post successfully', async () => {
        const req = {
            params: {
                userId: 1,
                postId: 2
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }

        const mockResult = {
            rowsAffected: [1]
        }

        const pool = {
            request: jest.fn(() => pool),
            input: jest.fn(() => pool),
            execute: jest.fn().mockReturnValue(mockResult)
        }

        mssql.connect = jest.fn().mockReturnValue(pool);

        await deletePost(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Post deleted successfully' });
    })
})