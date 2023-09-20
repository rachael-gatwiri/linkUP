//Unit Testing for followUser'

const mssql = require('mssql');
const {sqlConfig} = require('../../../Config/config');
const { followUser } = require('../../../Controllers/Follow.Controller');

describe('Checking fields', () =>{
    it('should throw an error if body is empty', async () => {
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

        await followUser(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'All inputs are required'})
    })

    it('should throw an error if follower_id is empty', async () => {
        const req = {
            body: {
                follower_id: null,
                following_id : 2
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
    
        await followUser(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'All inputs are required'})
    })

    it('should throw an error if following_id is empty', async () => {
        const req = {
            body: {
                follower_id: 2,
                following_id : null
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
    
        await followUser(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'All inputs are required'})
    })
})

describe('checking if user is already following', () => {
    it('should throw an error if the user is already followed', async() => {
        const req = {
            body: {
                follower_id: 'hsakkal152672_wj27829',
                following_id : 'gsjkal42627'
            }
        }
        const res = {  
            status: jest.fn(() => res),
            json: jest.fn()
         }
         mockresult = {
            recordset: [
                {
                    follower_id: 'hsakkal152672_wj27829',
                    following_id : 'gsjkal42627'
                }
            ]
         }

            jest.spyOn(mssql, 'connect').mockReturnValue({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                query: mockresult
            })

            await followUser(req, res)
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith({error: 'User is already followed'})
    })

  it('should Follow the user successfully', async() => {
    const req = {
        body: {
            follower_id: 'hsakkal152672_wj27829',
            following_id : 'gsjkal42627'
        }
    }
    const res = {  
        status: jest.fn(() => res),
        json: jest.fn()
     }

       jest.spyOn(mssql, 'connect').mockResolvedValue({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })
        await followUser(req, res)
        // expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message: 'User followed successfully' })
})

})