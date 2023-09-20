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
          const mockresult = {
              rowsAffected: [0]
          }

          jest.spyOn(mssql, 'connect').mockImplementation(() => Promise.resolve({
              request: () => ({
                  input: () => ({
                      execute: () => Promise.resolve(mockresult)
                    })
                })
                })
                )
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
          const mockresult = {
              rowsAffected: [1]
          }

          jest.spyOn(mssql, 'connect').mockImplementation(() => Promise.resolve({
              request: () => ({
                  input: () => ({
                      execute: () => Promise.resolve(mockresult)
                    })
                })
                })
                )
            await createPost(req, res)
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith({message: 'Post created successfully'})
        })
    })
