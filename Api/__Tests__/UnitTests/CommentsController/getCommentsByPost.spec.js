//unit testing get Comment by post
const mssql = require('mssql');
const { getCommentsByPost } = require('../../../Controllers/Comments.Controller');
// const {sqlConfig} = require('../../../Config/config')

describe('Getting Comments by post', () =>{
it('Should get all comments by post', async() =>{
    const req = {
        params: {
            post_id : 4
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

    await getCommentsByPost(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockresult.recordset);
   
})

it('should fail if it cannot get comments by post', async () => {
    const req = {
        params: {
            post_id : 4
        }
    }
    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }

    jest.spyOn(mssql, 'connect').mockRejectedValueOnce(new Error('error'))

    await getCommentsByPost(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({error: 'Internal server error'})
})
})