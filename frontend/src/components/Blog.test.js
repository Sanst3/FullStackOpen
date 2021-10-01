import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Blog, CreateBlog } from './Blog'

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

})

describe('<CreateBlog />', () => {
  let component
  let mockHandler
  let formState
  let setFormState

  test('form calls event handler and it has the right details', () => {
    mockHandler = jest.fn()
    formState = {
      author: 'test author',
      title: 'test title',
      url: 'test url'
    }
    setFormState = jest.fn()

    component = render(
      <CreateBlog formState={formState} setFormState={setFormState} handlePost={mockHandler}  />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'test author' }
    })

    fireEvent.change(title, {
      target: { value: 'test title' }
    })

    fireEvent.change(url, {
      target: { value: 'test url' }
    })

    fireEvent.submit(form)
    console.log(mockHandler.mock.calls[0][0].content)
    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})