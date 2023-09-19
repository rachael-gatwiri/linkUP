//unit testing for editComment

const mssql = require('mssql');
const { editComment } = require('../../../Controllers/Comments.Controller');

describe('Checking fields', () =>{
    it('should throw an error if body is empty', async () => {
        const req = {
            body: {}
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
    
        await editComment(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'All inputs are required' })
    })
    it('should throw an error if comment_id is empty', async () => {
        const req = {
            body: {
                comment_id: '',
                user_id : 2,
                new_comment_text : 'test'
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
    
        await editComment(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'All inputs are required' })
    })

        it('should throw an error if user_id is empty', async () => {
            const req = {
                body: {
                    comment_id: 2,
                    user_id : null,
                    new_comment_text : 'test'
                }
            }
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            }
        
            await editComment(req, res)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: 'All inputs are required'  })
        })

        it('should fail if new_comment_text is empty', async () => {
            const req = {
                body: {
                    comment_id: 2,
                    user_id : 2,
                    new_comment_text : ''
                }
            }
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            }
        
            await editComment(req, res)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith( {error: 'All inputs are required'} )
        })
})

describe('Checking if comments exist', () =>{
    it('should fail if comment does not exist', async () => {
        const req = {
            body: {
                comment_id: 2,
                user_id : 2,
                new_comment_text : 'test'
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        const mockresult = {
            rowsAffected: [0]
        }
        jest.spyOn(mssql, 'connect').mockImplementation(() => ({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValue(mockresult)
        }))
    
        await editComment(req, res)
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({error: 'Comment not found'})
    })

    it('should edit successfully if comment exists', async () => {
        const req = {
            body: {
                comment_id: 2,
                user_id : 2,
                new_comment_text : 'test'
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
    
        await editComment(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message: 'Comment edited successfully'})
    })
})