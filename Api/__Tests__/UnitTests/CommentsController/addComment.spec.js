//Unit Testing add comment controller
const mssql = require('mssql');
const sqlConfig = require('../../../Config/config')
const { addComment } = require('../../../Controllers/Comments.Controller');

describe('Checking fields', () => {
    it('should fail when the request body is empty', async () => {
        const req = {
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await addComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
    it('should fail when userId field is empty', async () =>{
        const req = {
            body: {
                user_id : '',
                post_id : '10',
                parent_comment_id: null,
                comment_text : 'testing'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await addComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    })

    it('should fail when postId field is empty', async () =>{
        const req = {
            body: {
                user_id : 12345,
                post_id : '',
                parent_comment_id: null,
                comment_text : 'testing'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await addComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    })

    it('should fail when comment Text field is empty', async () =>{
        const req = {
            body: {
                user_id : 10,
                post_id : 10,
                parent_comment_id: null,
                comment_text : ''
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await addComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    })
    it('should fail when parent Comment field is empty', async () =>{
        const req = {
            body: {
                user_id : 1234,
                post_id : 10,
                parent_comment_id: '',
                comment_text : 'testing'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await addComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    })
});

describe('Adding Comments and parent Comments Succesfully', async =>{
    it('should post a comment successfully', async() =>{
        const req = {
            body: {
                user_id : 1234,
                post_id : 10,
                parent_comment_id: null,
                comment_text : 'testing'
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
                rowsAffected: [0]
            })
        })

        await addComment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Comment added successfully' });
    })

    it('should post a Parent comment successfully', async() =>{
        const req = {
            body: {
                user_id : 1234,
                post_id : 10,
                parent_comment_id: 1,
                comment_text : 'testing'
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
                rowsAffected: [0]
            })
        })

        await addComment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Comment added successfully' });
    })
})
