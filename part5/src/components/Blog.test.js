import React from 'react'
import Blog from './Blog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

describe('blog component visualization', () => {
  let container

  const blog = {
    title: 'test title',
    author: 'test guy',
    url: 'test.com',
    likes: 5,
    user: { username: 'test user' }
  }

  const handleLike = jest.fn()
  const handleDelete = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={ blog } likeBlog={ handleLike } deleteBlog={ handleDelete }/>
    ).container
  })

  test('renders default blog content', () => {
    const element = container.querySelector('.blog')
    expect(element).not.toHaveStyle('display: none')
    expect(element).toHaveTextContent(
      'test title test guy'
    )
  })

  test('renders additional blog content', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const element = container.querySelector('.blog-data')
    expect(element).not.toHaveStyle('display: none')
    expect(element).toHaveTextContent('test.com')
    expect(element).toHaveTextContent('5')
  })

  test('like button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(handleLike.mock.calls).toHaveLength(2)
  })
})


