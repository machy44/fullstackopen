notes are extracted from original source (link: https://fullstackopen.com/en/part8)

## graphql server

Let's consider the following example: our bloglist application contains some kind of social media functionality, and we would like to show a list of all the blogs that were added by users who have commented on any of the blogs we follow.

If the server implemented a REST API, we would probably have to do multiple HTTP reqests from the browser before we had all the data we wanted. The requests would also return a lot of unnecessary data, and the code on the browser would probably be quite complicated.

If this was an often-used functionality, there could be a REST endpoint for it. If there were a lot of these kinds of scenarios however, it would become very laborious to implement REST endpoints for all of them. 

A GraphQL server is well-suited for these kinds of situations. 

Despite its name, GraphQL does not actually have anything to do with databases. It does not care how the data is saved. The data a GraphQL API uses can be saved into a relational database, document database, or to other servers which a GraphQL server can access with for example REST.


### resolvers

https://www.graphql-tools.com/docs/resolvers#resolver-function-signature

resolver get four arguments:

`fieldName(obj, args, context, info) { result }` 

- `obj` -> object that contains the result returned from the resolver on the parent field.
for example:

```graphql
query {
  getAuthor(id: 5) {
    name
    posts {
      title
      author {
        name # this will be the same as the name above
      }
    }
  }
}
```
- `obj` in `Author.name` and `Author.posts` will be the result from `getAuthor`, likely an Author object from the backend.

- `args` -> arguments passed into the field in the query
- `context` -> object shared by all resolvers
- `info` -> (advanced) it contains information about execution state of the query

## More on queries

With GraphQL, it is possible to combine multiple fields of type Query, or "separate queries" into one query

```graphql
query {
  personCount
  allPersons {
    name
  }
}
```

Combined query can also use the same query multiple times

```graphql
query {
  havePhone: allPersons(phone: YES){
    name
  }
  phoneless: allPersons(phone: NO){
    name
  }
}
```

response

```json
{
  "data": {
    "havePhone": [
      {
        "name": "Arto Hellas"
      },
      {
        "name": "Matti Luukkainen"
      }
    ],
    "phoneless": [
      {
        "name": "Venla Ruuska"
      }
    ]
  }
}
```

https://graphql.org/learn/queries/#variables