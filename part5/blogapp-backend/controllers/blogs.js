const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(400).end()
    }
})
    
blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    
    const blog = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).json({ error: 'could not find blog to delete' })
    }
    const blogUserId = blog.user.toString()
    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'token invalid' })
    } else if (user.id !== blogUserId) {
        response.status(403).json({ error: 'user does not have permission'})
    } else if (user.id === blogUserId) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter