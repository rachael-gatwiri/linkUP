//unit testing for getCommentsByComment
const mssql = require('mssql');
const { getCommentsByComment } = require('../../../Controllers/Comments.Controller');

describe('Getting Comments by comment', () =>{
    it('Should get all comments by comment', async() =>{
        const req = {
            params: {
                comment_id : 4
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
       const mockresult = {
             recordset: []
       }
        jest.spyOn(mssql, 'connect').mockImplementation(() => ({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValue(mockresult)
        }))
    
        await getCommentsByComment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockresult.recordset);
    })

})