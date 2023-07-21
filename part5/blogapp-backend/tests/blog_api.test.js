const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('blogs can be fetched', () => {
    test('blog schema operating', async () => {
        const blogs = await testHelper.blogsInDb()
        const blogToTest = blogs[0]
        expect(blogToTest.id).toBeDefined()
    })

    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-type', /application\/json/)
      })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(testHelper.initialBlogs.length)
    })

    test('a specific blog is returned', async () => {
        const blogsInDb = await testHelper.blogsInDb()
        const blogToFind = blogsInDb[0]
        const resultBlog = await api.get(`/api/blogs/${blogToFind.id}`)
                                  .expect(200)
                                  .expect('Content-Type', /application\/json/)
        expect(resultBlog.body).toEqual(blogToFind)
    })
})

describe('blog CRUD', () => {
    let token = ''
    let testUser
    beforeAll(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('test', 10)
        const user = new User({ username: 'root', passwordHash})
        await user.save()
        testUser = user
        const response = await api.post('/api/login')
                                  .send({username: 'root', password: 'test'})
        
        token = response.body.token


    })
    test('a valid blog can be added', async () => {
        const blogToAdd = {
            title: "My new blog",
            author: "Test Person",
            url: "http://www.test.test",
            user: testUser.id
        }
    
        await api.post('/api/blogs')
                 .set('Authorization', `Bearer ${token}`)
                 .send(blogToAdd)
                 .expect(201)
                 .expect('Content-Type', /application\/json/)
    
        const blogsInDb = await testHelper.blogsInDb()
        const newBlog = blogsInDb.find(blog => blog.author === 'Test Person')
        expect(newBlog.likes).toEqual(0)
        expect(blogsInDb).toHaveLength(testHelper.initialBlogs.length + 1)
        expect(newBlog.title).toEqual('My new blog')
    })
    
    test('an invalid blog will not be added', async () => {
        const blogToAdd = {
            author: "Test Person",
            url: "http://www.test.test"
        }
    
        await api.post('/api/blogs')
                 .send(blogToAdd)
                 .expect(400)
    })
    
    test('a blog can be updated', async () => {
        const blogsInDb = await testHelper.blogsInDb()
        const blogToUpdate = blogsInDb[0]
        const updatedLikes = 99
        const updatedTitle = 'Testing title again'
        const updatedUrl = "http://www.updatedurl.url"
        const updatedValues = {
            author: blogToUpdate.author,
            title: updatedTitle,
            url: updatedUrl,
            likes: updatedLikes
        }
    
        await api.put(`/api/blogs/${blogToUpdate.id}`)
                 .send(updatedValues)
                 .expect(200)
        
        const updatedBlogs = await testHelper.blogsInDb()
        const updatedBlog = updatedBlogs.find(b => b.title = updatedTitle)
    
        expect(updatedBlog.likes).toEqual(updatedLikes)
        expect(updatedBlog.title).toEqual(updatedTitle)
        expect(updatedBlogs.length).toEqual(testHelper.initialBlogs.length)
    })
    
    test('a blog can be deleted', async () => {
        const blogToAdd = {
            title: "BlogToBeDeleted",
            author: "Test",
            url: "http://www.test.test",
            user: testUser.id
        }
    
        await api.post('/api/blogs')
                 .set('Authorization', `Bearer ${token}`)
                 .send(blogToAdd)

        const blogsInDb = await testHelper.blogsInDb()
        const blogToDelete = blogsInDb.find(n => n.title === 'BlogToBeDeleted')
        await api.delete(`/api/blogs/${blogToDelete.id.toString()}`)
                 .set('Authorization', `Bearer ${token}`)
                 .expect(204)
        
        const notesAfterDelete = await testHelper.blogsInDb()
        expect(notesAfterDelete).toHaveLength(blogsInDb.length - 1)
    })
})

describe('user tests', () => {
    test('a user can be created', async() => {
        const usersInDb = await testHelper.usersInDb()
    
        const password = 'test123'
        const username = "testguy6969420"
        const name = "Test Guy"
    
        const userToAdd = {
            name: name,
            username: username,
            password: password
        }
    
        await api.post('/api/users')
                 .send(userToAdd)
                 .expect(201)
                 .expect('Content-Type', /application\/json/)
    
        const updatedUsersInDb = await testHelper.usersInDb()
        const newUser = updatedUsersInDb.find(user => user.username === username)
        expect(updatedUsersInDb).toHaveLength(usersInDb.length + 1)
        expect(newUser.name).toEqual(name)
    })

    test('user password is too short', async() => {
        const password = 'tg'
        const username = "testguy6969420"
        const name = "Test Guy"
    
        const userToAdd = {
            name: name,
            username: username,
            password: password
        }
    
        await api.post('/api/users')
                 .send(userToAdd)
                 .expect(400)
                 .expect('Content-Type', /application\/json/)
    })

    test('username is too short', async() => {
        const password = 'testpw1'
        const username = "tg"
        const name = "Test Guy"
    
        const userToAdd = {
            name: name,
            username: username,
            password: password
        }
    
        await api.post('/api/users')
                 .send(userToAdd)
                 .expect(400)
                 .expect('Content-Type', /application\/json/)
    })
})



afterAll(async () => {
    await mongoose.connection.close()
})