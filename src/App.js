import React from 'react';
import { getAll, update, search } from './BooksAPI';
import Main from './Pages/Main'
import Search from './Pages/Search'
import { Route } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  clearingBooksArray = () => { 
    this.setState({
      books: []
    })
  };
  
  findBooks = (eBooks, e) => {
    this.setState({
      books: []
    })
    if (!e.target.value) {
      return this.setState({
        books: [],
      });
    }
    search(e.target.value)
      .then((books) => {
        if (!e.target.value) {
          return this.setState({
            books: [],
          });
        }
        if (books.error) {
          return this.setState({
            books: 'No Results',
          });
        }

        // Filter
        const readyBooks = books.map(book => {
        const fBook = eBooks.find(ele => ele.id === book.id);
          if (fBook) {
            return fBook;
          }
          return book
        })
        
        this.setState({
          books: readyBooks
        });
      })
      .catch((err) => {
        this.setState({
          books: 'No Results',
        });
      });
  }
  
  moveBook = (book, e) => {
    update(book, e.target.value)
      .then(() => {
        return getAll();
      })
      .then((data) => {
        this.setState({
          books: data,
        });
      });
  };

  addBook = (book, e) => {
    update(book, e.target.value);
  }

  fetchAllBooks = () => {
    getAll().then((data) => {
      this.setState({
        books: data,
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => {
            return (
              <Main
                whatToMount={this.fetchAllBooks}
                books={this.state.books}
                moveBook={this.moveBook}
              />
            );
          }}
        />
        <Route path="/search" exact render={() => {
          return (
            <Search
              books={this.state.books}
              search={this.findBooks}
              clearingBooksArray={this.clearingBooksArray}
              moveBook={this.addBook}
            />
          );
        }} />
      </div>
    );
  }
}

export default BooksApp;
