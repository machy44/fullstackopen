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

const addAuthorWithoutBorn = (name) => `
mutation {
  addAuthor(name: "${name}") {
    name
    born
    bookCount
  }
}`;

const addAuthorWithBorn = (name, born) => `
mutation {
  addAuthor(name: "${name}", born: ${born}) {
    name
    born
    bookCount
  }
}`;

const editAuthor = (name, setBornTo) => `mutation {
  editAuthor(name: "${name}", setBornTo: ${setBornTo}) {
    name
    born
    bookCount
  }
}`;

module.exports = {
  addBookAuthorExists,
  addBookAuthorDoesntExist,
  addAuthorWithoutBorn,
  addAuthorWithBorn,
  editAuthor,
};
