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

module.exports = {
  bookCountQuery,
  allBooksQuery,
  authorCountQuery,
  booksQueryByAuthor,
};
