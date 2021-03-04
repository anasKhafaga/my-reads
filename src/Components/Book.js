import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func,
  }
  
  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`,
              }}
            ></div>
              <div className="book-shelf-changer">
              <select onChange={this.props.moveBook.bind(this, this.props.book)} defaultValue={this.props.book.shelf ? this.props.book.shelf : 'none'}>
                  <option value="move" disabled>
                    Move to...
                </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>
      </li>
    );
  }
}
