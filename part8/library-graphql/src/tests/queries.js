const bookCountQuery = `query {
  bookCount
}`;

const authorCountQuery = `query {
authorCount
}`;

const allBooksQuery = `query  {
  allBooks {
    title
    published
    author {
      name
      id
      born
      bookCount
    }
    id
    genres
  }
}`;

const booksQueryByAuthor = (autor) => `query {
    allBooks(author: "${autor}") {
      title
      genres
      author {
        name
        bookCount
      }
    }
  }
  `;

const allAuthorsQuery = `
query {
  allAuthors {
    born
    name
    bookCount
  }
}
`;

const booksQueryByAuthorGenre = (author, genre) => `query {
  allBooks(author: "${author}", genre: "${genre}") {
    title
    author {
      name
      bookCount
    }
  }
}`;

const meQuery = `query {
  me {
    username
    favoriteGenre
  }
}`;

module.exports = {
  bookCountQuery,
  allBooksQuery,
  authorCountQuery,
  booksQueryByAuthor,
  allAuthorsQuery,
  booksQueryByAuthorGenre,
  meQuery,
};
