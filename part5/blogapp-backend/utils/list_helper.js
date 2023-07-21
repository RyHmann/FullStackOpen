const _ = require('lodash')

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, obj) => accumulator + obj.likes, 0)
}

const findFavoriteBlog = (blogs) => {
    const favoriteBlog =  blogs.reduce((mostLikes, obj) => mostLikes.likes > obj.likes ? mostLikes : obj, [])
    if (favoriteBlog.length < 1) return []
    else {
        delete favoriteBlog._id
        delete favoriteBlog.url
        delete favoriteBlog.__v
        return favoriteBlog
    }
}

const mostBlogs = (blogs) => {
    const mostBlogs =  _(blogs)
                        .groupBy('author')
                        .map( (objs, keys) => ({
                        'author': keys,
                        'blogs': objs.length
                        }))
                        .maxBy('blogs')
    return mostBlogs === undefined ? [] : mostBlogs
  }
  
  const mostLikes = (blogs) => {
    const mostLikes = _(blogs)
                        .groupBy('author')
                        .map((objs, key) => ({
                            'author': key,
                            'likes': _.sumBy(objs, 'likes')
                        }))
                        .maxBy('likes')
    return mostLikes === undefined ? [] : mostLikes
  }

module.exports = {
    totalLikes,
    findFavoriteBlog,
    mostBlogs,
    mostLikes
}