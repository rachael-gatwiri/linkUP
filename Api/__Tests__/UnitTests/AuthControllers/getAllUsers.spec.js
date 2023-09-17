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
              execute: jest.fn().mockResolvedValueOnce(mockResult)0
              
       });

         await getAllUsers({}, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResult.recordset);


    })
})