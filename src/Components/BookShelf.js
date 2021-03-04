import React, { Component } from 'react'
import Book from './Book';
import PropTypes from 'prop-types';

export default class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    moveBook: PropTypes.func.isRequired
  };

  render() {
    const books = this.props.books.map((book) => {
      return (
        <Book
          key={book.id}
          book={book}
          moveBook={this.props.moveBook}
        />
      );
    });
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{books}</ol>
        </div>
      </div>
    );
  }
}
