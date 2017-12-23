import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Book from '../Book/Book'

class Search extends Component {
  state = {
    query: '',
    foundBooks: []
  }

  updateFoundBooks(books) {
    books.map(book => {
      const bookInShelf = this.props.books.find(b => b.id === book.id)
      if (bookInShelf) {
        book.shelf = bookInShelf.shelf
      }
      return book;
    })
    this.setState({
      foundBooks: books
    })
  }

  search = (e) => {
    const query = e.target.value
    this.setState({ query })
    if (query === '') {
      return
    }
    BooksAPI
      .search(query)
      .then(books => {
        if (books && Array.isArray(books)) {
          this.updateFoundBooks(books)
        }
        if (books && books.error === 'empty query') {
          this.setState({ foundBooks: [] })
        }
      })
      .catch(console.error)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" autoFocus value={this.state.query} onChange={this.search} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.foundBooks.map((book, index) => (
              <li key={index}>
                <Book book={book} onShelfChange={this.props.onShelfChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default Search
