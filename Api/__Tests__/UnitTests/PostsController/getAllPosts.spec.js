// Unit testing for getAllPosts

const mssql = require('mssql')
const {getAllPosts} = require('../../../Controllers/Posts.Controller')

describe('Checking if the posts exist', () => {
    it('should show all the posts existing', async () => {
        const mockresult = {
            recordset: [
                {
                    post_id: 1,
                    user_id: 1,
                    content: 'This is a test post',
                    postImage: 'test.png',
                },
                {
                    post_id: 2,
                    user_id: 2,
                    content: 'This is a test post',
                    postImage: 'test.png',
                },
                {
                    post_id: 3,
                    user_id: 3,
                    content: 'This is a test post',
                    postImage: 'test.png',
                }
            ]
        }

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
     }

     jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce(mockresult)
            
     });

       await getAllPosts({}, res);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(mockresult.recordset);

  })
})