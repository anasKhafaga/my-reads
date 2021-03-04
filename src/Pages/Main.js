import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../Components/BookShelf';
import PropTypes from 'prop-types';

export default class Main extends Component {

  static propTypes = {
    whatToMount: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.whatToMount();
  }

  render() {
    const cReading = this.props.books.filter(
      (book) => book.shelf === 'currentlyReading'
    );
    const wReading = this.props.books.filter(
      (book) => book.shelf === 'wantToRead'
    );
    const Reading = this.props.books.filter((book) => book.shelf === 'read');
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              books={cReading}
              shelfTitle="Currently Reading"
              moveBook={this.props.moveBook}
            />
            <BookShelf
              books={wReading}
              shelfTitle="Want to Read"
              moveBook={this.props.moveBook}
            />
            <BookShelf
              books={Reading}
              shelfTitle="Read"
              moveBook={this.props.moveBook}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
