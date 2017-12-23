import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ book, unselect = false, onShelfChange }) => {
  const shelf = book.shelf ? book.shelf : 'none'

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={(e) => {
            onShelfChange(book, e.target.value)
          }}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            {unselect && <option value="none">None</option>}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{(book.authors) && book.authors.join(' / ')}</div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  unselect: PropTypes.bool,
  onShelfChange: PropTypes.func.isRequired
}

export default Book
