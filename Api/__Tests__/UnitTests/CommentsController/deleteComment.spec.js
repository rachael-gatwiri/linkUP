// unit testing for deleteComment

const mssql = require('mssql');
const sqlConfig = require('../../../Config/config');
const { deleteComment } = require('../../../Controllers/Comments.Controller');
const { request } = require('express');

describe('Checking fields', () =>{
    it('should fail if body is empty', async () => {
        const req = {
            body: {}
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        const mockresult = {
            recordset: []
        }
        mssql.connect = jest.fn(() => mockresult)

        await deleteComment(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({error: 'Internal server error'})
    })

    it('should fail if comment_id is null', async () => {
        const req = {
            body: {
                comment_id: null,
                user_id : 2
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        const mockresult = {
            recordset: []
        }
        mssql.connect = jest.fn(() => mockresult)
    
        await deleteComment(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({error: 'Internal server error'})
    })
})

describe('Checking if comment exists', () => {
    it('should fail if comment does not exist', async () => {
        const req = {
            body: {
                comment_id: 1
            }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        
        const mockresult = {
            returnValue: 1,
        }
       
        jest.spyOn(mssql, 'connect').mockReturnValue({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockReturnValue(mockresult)
        });
    
        await deleteComment(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Comment not found' });
    });

    it('should fail if comment does not exist', async () => {
        const req = {
            body: {
                comment_id: 1
            }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        
        const mockresult = {
            returnValue: 0,
        }
       
        jest.spyOn(mssql, 'connect').mockReturnValue({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockReturnValue(mockresult)
        });
    
        await deleteComment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Comment deleted successfully'});
    });
});

