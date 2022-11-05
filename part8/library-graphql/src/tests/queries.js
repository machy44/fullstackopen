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

const addBookAuthorExists = `
mutation {
  addBook(
    title: "NoSQL Distilled",
    author: "Martin Fowler",
    published: 2012,
    genres: ["database", "nosql"]
  ) {
    title,
    author {
      name
      bookCount
      born
    }
  }
}
`;

const addBookAuthorDoesntExist = `mutation {
  addBook(
    title: "Pimeyden tango",
    author: "Reijo Mäki",
    published: 1997,
    genres: ["crime"]
  ) {
    title,
    author {
      name
      bookCount
      born
    }
  }
}`;

module.exports = {
  bookCountQuery,
  allBooksQuery,
  authorCountQuery,
  booksQueryByAuthor,
  allAuthorsQuery,
  booksQueryByAuthorGenre,
  addBookAuthorExists,
  addBookAuthorDoesntExist,
};
