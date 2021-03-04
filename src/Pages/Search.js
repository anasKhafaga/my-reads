import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Book from '../Components/Book';
import PropTypes from 'prop-types';

export default class Search extends Component {
  static propTypes = {
    clearingBooksArray: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    moveBook: PropTypes.func
  };

  state = {
    existingBooks: this.props.books
  }
  
  componentDidMount() {
    this.props.clearingBooksArray();
  }

  render() {
    let books;
    if (typeof this.props.books === 'string') {
      books = <h2>{this.props.books}</h2>;
    } else if (this.props.books.length > 0) {
      const preBooks = this.props.books.filter((book) => book.imageLinks && book.imageLinks.thumbnail);
      books = preBooks.map((book) => {
        return (
          <Book key={book.id} book={book} search={true} moveBook={this.props.moveBook} />
        );
      });
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.props.search.bind(this, this.state.existingBooks)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{books}</ol>
        </div>
      </div>
    );
  }
}
