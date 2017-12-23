import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import List from '../List/List'
import Search from '../Search/Search'
import './App.css'

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => {
        this.setState({ books })
      })
  }

  changeShelf = (book, newShelf) => {
    if (!book || !newShelf) {
      return
    }

    const oldBooks = this.state.books;

    // Add new book to shelf.
    const existingBook = this.state.books.find(b => b.id === book.id)
    if (!existingBook) {
      book.shelf = newShelf
      this.setState((prevState) => {
        return {
          books: [...prevState.books, book]
        }
      })
    }

    // Remove book from shelf.
    if (newShelf === 'none') {
      const filteredBooks = this.state.books.filter((b) => b.id !== book.id)
      this.setState({ books: filteredBooks })
    }

    if (existingBook && newShelf !== 'none') {
      const updatedBooks = this.state.books.map(b => {
        if (b.id !== book.id) {
          return b
        }
        return {
          ...b,
          shelf: newShelf
        }
      })

      this.setState({
        books: updatedBooks
      })
    }

    BooksAPI
      .update(book, newShelf)
      .catch((err) => {
        this.setState({ books: oldBooks })
        alert('An unexpected error occured. Please try again later.')
      })
  }

  render() {
    return (
      <div>
        <Route path="/" exact render={() => (<List books={this.state.books} onShelfChange={this.changeShelf} />)} />
        <Route path="/search" render={() => (<Search books={this.state.books} onShelfChange={this.changeShelf} />)} />
      </div>
    )
  }
}

export default App
