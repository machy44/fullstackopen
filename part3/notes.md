## npm links

- transitive dependencies https://lexi-lambda.github.io/blog/2016/08/24/understanding-the-npm-dependency-model/
- semantic versioning https://docs.npmjs.com/about-semantic-versioning/

## git submodules links

- https://dev.to/jjokah/submodules-a-git-repo-inside-a-git-repo-36l9

- https://stackoverflow.com/questions/12514197/convert-a-git-folder-to-a-submodule-retrospectively

## git remove node_modules from cache

https://stackoverflow.com/a/50675909

## node debugging

`node --inspect index.js

## mongodb

- links

  - https://docs.mongodb.com/manual/core/databases-and-collections/
  - https://docs.mongodb.com/manual/core/document/

- mongodb stores documents in collections. Collections are analogous to tables in relational databases.

- BSON is binary representation of JSON
- Documents are composed of field-and-value pairs

```javascript
{
  field: value1,
  field2: value2,
  ...
  ...
  fieldN: valueN
}
```

- value of a field ca be any of BSON data types(https://docs.mongodb.com/manual/reference/bson-types/), **including other documents, arrays, and arrays of documents**

- dot notation is used to access certain element in array
- maximum BSON documentssize is 16 mb
- unlike js objects, the fields in a BSON document are ordered

## mongodb service

https://cloud.mongodb.com

## mongoose

Traditionally document databases like Mongo do not support join queries that are available in relational databases, used for aggregating data from multiple tables. However starting from version 3.2. Mongo has supported lookup aggregation queries. We will not be taking a look at this functionality in this course.

If we need a functionality similar to join queries, we will implement it in our application code by making multiple queries.
In certain situations Mongoose can take care of joining and aggregating data, which gives the appearance of a join query. However, even in these situations Mongoose makes multiple queries to the database in the background.

As previously mentioned, document databases do not properly support join queries between collections, but the Mongoose library can do some of these joins for us. Mongoose accomplishes the join by doing multiple queries, which is different from join queries in relational databases which are transactional, meaning that the state of the database does not change during the time that the query is made. With join queries in Mongoose, nothing can guarantee that the state between the collections being joined is consistent, meaning that if we make a query that joins the user and notes collections, the state of the collections may change during the query.

### schema

- each schema maps to a mongodb collection and defines the shape of the documents within that collection

### model

- fancy constructors compiled from Schema definitions. An instance of a model is called a **_document_**
- models are responsible for creating and reading documents from the underlying mongodb database
