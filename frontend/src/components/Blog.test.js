import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Blog } from './Blog'

describe('<Blog />', () => {
  let component
  let mockHandler
  let mockUsername

  beforeEach(() => {
    mockHandler = jest.fn()
    mockUsername = 'test username'
    const testBlog = {
      user: { blogs: [], name: 'testname', username: 'testusername ' },
      author: 'test author',
      title: 'test title',
      url: 'test url',
      likes: 5
    }
    component = render(
      <Blog blog={testBlog} username={mockUsername} likeHandler={mockHandler} />
    )
  })

  test('renders title and author but not url and likes', () => {
    const div = component.container.querySelector('.blogToggleable')
    expect(component.container).toHaveTextContent('test author')
    expect(component.container).toHaveTextContent('test url')
    expect(div).toHaveStyle('display: none')
  })

  test('blog url and likes shown when button pressed', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.blogToggleable')
    expect(div).not.toHaveStyle('display: none')
  })

  test('if like is clicked twice, event handler is called twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('form calls event handler and it has the right details', () => {
    //TODO
  })
})