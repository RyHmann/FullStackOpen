import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

// finish 5.16 - testing the form

describe('BlogForm tests', () => {
  let container
  const createBlog = jest.fn()
  const user = userEvent.setup()

  beforeEach( () => {
    container = render(<BlogForm createBlog={ createBlog }/>).container
  })

  test('creating a blog', async () => {

    const addButton = container.querySelector('#blog-button')

    const testTitle = 'test title'
    const testAuthor = 'test person'
    const testUrl = 'www.test.testing'

    const titleInput = container.querySelector('#title')
    await user.type(titleInput, testTitle)

    const authorInput = container.querySelector('#author')
    await user.type(authorInput, testAuthor)

    const urlInput = container.querySelector('#url')
    await user.type(urlInput, testUrl)

    await user.click(addButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(testTitle)
    expect(createBlog.mock.calls[0][0].author).toBe(testAuthor)
    expect(createBlog.mock.calls[0][0].url).toBe(testUrl)
  })
})