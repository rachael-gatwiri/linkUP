const mssql = require('mssql');
const { getAllUsers } = require('../../../Controllers/Auth.Controller');

describe('getting all users', () => {
    it('should return all users', async () => {
       const mockResult = {
              recordset: []
       }
       const res = {
              status: jest.fn(() => res),
              json: jest.fn()
       }

       jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
              request: jest.fn().mockReturnThis(),
              execute: jest.fn().mockResolvedValueOnce(mockResult)
              
       });

         await getAllUsers({}, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResult.recordset);

    })

    it('should fail if it cannot get all users', async () => {
              const res = {
              status: jest.fn(() => res),
              json: jest.fn()
              }
       
              jest.spyOn(mssql, 'connect').mockRejectedValueOnce(new Error('Error'))
       
              await getAllUsers({}, res)
              expect(res.status).toHaveBeenCalledWith(500)
              expect(res.json).toHaveBeenCalledWith({error: 'Internal server error'})
    })
})