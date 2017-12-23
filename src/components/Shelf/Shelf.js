import React from 'react'
import PropTypes from 'prop-types'
import Book from '../Book/Book'

const Shelf = ({ title, books = [], onShelfChange }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book, index) => (
          <li key={index}>
            <Book book={book} unselect={true} onShelfChange={onShelfChange} />
          </li>
        ))}
      </ol>
    </div>
  </div>
)

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
  onShelfChange: PropTypes.func.isRequired
}

export default Shelf
