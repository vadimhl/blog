import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateNew from './createNew'

describe('<CreateNew />', () => {
  let addBlog
  let component
  beforeEach( () => {
    addBlog = jest.fn()
    component = render (
      <CreateNew addBlog={addBlog} />
    )
  })
  test('Form input', () => {
    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')


    fireEvent.change(title, {
      target: { value: 'title form test' }
    })

    fireEvent.change(author, {
      target: { value: 'author form test' }
    })
    fireEvent.change(url, {
      target: { value: 'url form test' }
    })

    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    //console.log(addBlog.mock.calls[0])
    expect(addBlog.mock.calls[0][0].title).toBe('title form test')
    expect(addBlog.mock.calls[0][0].author).toBe('author form test')
    expect(addBlog.mock.calls[0][0].url).toBe('url form test')
  })

})