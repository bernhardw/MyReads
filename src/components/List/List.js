import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Shelf from '../Shelf/Shelf'

const List = ({ books, onShelfChange }) => {
  const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
  const wantToRead = books.filter(book => book.shelf === 'wantToRead')
  const read = books.filter(book => book.shelf === 'read')

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf title="Currently Reading" books={currentlyReading} onShelfChange={onShelfChange} />
          <Shelf title="Want to Read" books={wantToRead} onShelfChange={onShelfChange} />
          <Shelf title="Read" books={read} onShelfChange={onShelfChange} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

List.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default List
