const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')



describe('total likes', () => {
    test('when list is empty', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
    
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(testHelper.singleBlog)
        expect(result).toBe(5)
    })

    test('when list has more than one blog', () => {
        const result = listHelper.totalLikes(testHelper.initialBlogs)
        expect(result).toBe(38)
    })
})

describe('favorite blog', () => {

    test('empty blog array', () => {
        const result = listHelper.findFavoriteBlog([])
        expect(result).toEqual([])
    })

    test('one blog', () => {
        const result = listHelper.findFavoriteBlog(testHelper.singleBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
            
        })
    })

    test('multiple blogs', () => {
        const result = listHelper.findFavoriteBlog(testHelper.initialBlogs)
        expect(result).toEqual({
            title: "First class tests",
            author: "Robert C. Martin",
            likes: 12,
        })
    })
})

describe('most blogs', () => {

    test('empty array', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual([])
    })

    test('one blog', () => {
        const result = listHelper.mostBlogs(testHelper.singleBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })

    test('multiple blogs', () => {
        const result = listHelper.mostBlogs(testHelper.initialBlogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe('most likes', () => {

    test('empty array', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual([])
    })
    
    test('one blog', () => {
        const result = listHelper.mostLikes(testHelper.singleBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 5
        })
    })

    test('multiple blogs', () => {
        const result = listHelper.mostLikes(testHelper.initialBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})

