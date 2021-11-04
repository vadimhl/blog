import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  let component

  const blog = {
    title: 'title Blog for test',
    author: 'Author test',
    url: 'url test',
    likes: 1,
    user: { id:1, }
  }

  const mockHandlerLike = jest.fn( )
  const mockHandlerRemove = jest.fn( )

  beforeEach( () => {

    component = render (
      <Blog blog={blog} addLike={mockHandlerLike} remove={mockHandlerRemove} />
    )
  })

  test( 'Basic render', () => {
    expect(component.container).toHaveTextContent('title Blog for test')
    expect(component.container).toHaveTextContent('Author test')
    expect(component.container).not.toHaveTextContent('url test')
    expect(component.container).not.toHaveTextContent('likes 1')

  })

  test( 'Full render', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('title Blog for test')
    expect(component.container).toHaveTextContent('Author test')
    expect(component.container).toHaveTextContent('url test')
    expect(component.container).toHaveTextContent('likes 1')

  })

  test( 'Hide detail', () => {
    const buttonShow = component.getByText('show')
    fireEvent.click(buttonShow)

    const buttonHide = component.getByText('hide')
    fireEvent.click(buttonHide)

    expect(component.container).toHaveTextContent('title Blog for test')
    expect(component.container).toHaveTextContent('Author test')
    expect(component.container).not.toHaveTextContent('url test')
    expect(component.container).not.toHaveTextContent('likes 1')

  })

  test( 'Like clicks', () => {
    const buttonShow = component.getByText('show')
    fireEvent.click(buttonShow)

    const buttonLike = component.getByText('like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)
    expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })

})

