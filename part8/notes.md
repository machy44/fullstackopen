notes are extracted from original source (link: https://fullstackopen.com/en/part8)

## graphql server

**schema** - describes the data sent between the client and the server

**scalar types** in graphql are string, int, float, boolean, ID


**Query** - tells what kind of queries can be made to the API

**Fields** - GraphQL is about asking for specific fields on objects

**Mutations** - all operations which cause a change on server side. Mutations are described in the schema as the keys of type Mutation.

```javascript
{
  hero {
    name
  }
}
```

GraphQL query describes only the data moving between a server and the client. On the server, the data can be organized and saved any way we like.

Despite its name, GraphQL does not actually have anything to do with databases. It does not care how the data is saved. The data a GraphQL API uses can be saved into a relational database, document database, or to other servers which a GraphQL server can access with for example REST.

**resolvers** - a resolver is a function that's responsible for populating the data for a single field in your schema.


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


## Object within an object - important!!!

```
type Address {  street: String!  city: String! }
type Person {
  name: String!
  phone: String
  address: Address!  id: ID!
}
type Query {
  personCount: Int!
  allPersons: [Person!]!
  findPerson(name: String!): Person
}
```
The queries requiring the address change into
```
query {
  findPerson(name: "Arto Hellas") {
    phone 
    address {
      city 
      street
    }
  }
}
```
**!!But we not have to change the structure of data saved in database and it can still look like this **

```
let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  // ...
]
```

Because the objects saved in the array do not have an address field, the default resolver is not sufficient. Let's add a resolver for the address field of Person type : 

```
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  },
  Person: {    
    address: (root) => {      
      return {    
        street: root.street,   
        city: root.city 
      } 
    }
  }}
```

So every time a Person object is returned, the fields name, phone and id are returned using their default resolvers, but the field address is formed by using a self-defined resolver. The parameter root of the resolver function is the person-object, so the street and the city of the address can be taken from its fields.

## Error handling

- graphql has some default done validations - https://graphql.org/learn/validation/
- stricter rules has to be handled manually  - https://www.apollographql.com/docs/apollo-server/data/errors/

## Enum

 This allows you to:

  - Validate that any arguments of this type are one of the allowed values
  - Communicate through the type system that a field will always be one of a finite set of values

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