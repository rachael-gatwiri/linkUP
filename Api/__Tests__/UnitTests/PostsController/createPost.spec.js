//unit testing for createPost

const mssql = require('mssql')
const {createPost} = require('../../../Controllers/Posts.Controller')

describe('Checking Fields', () => {
    it('should throw an error if the userId is not provided', async () => {
        const req = {
            body: {
                content: 'This is a test post'
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await createPost(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Please provide post caption'})
    })

    it('should throw an error if the content is not provided', async () => {
        const req = {
            body: {
                userId: '1'
            }
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await createPost(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Please provide post caption'})
    })

    it('should throw an error if the userId and content is not provided', async () => {
        const req = {
            body: {}
        }
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
        await createPost(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Please provide post caption'})
    })
    })

    describe('Checking if the post was created', () => {
        it('should fail if the post was not created', async () => {
            const req = {
                body: {
                    userId: '1',
                    content: 'This is a test post'
                }
            }
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            }

            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })
            
            await createPost(req, res)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({error: 'Failed to create the post'})
        })

        it('should pass if the post was created', async () => {
            const req = {
                body: {
                    userId: '1',
                    content: 'This is a test post'
                }
            }
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            }
            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
        
            })

            await createPost(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({message: 'Post created successfully'})
        })
    })
