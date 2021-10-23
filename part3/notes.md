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

### schema

- each schema maps to a mongodb collection and defines the shape of the documents within that collection

### model

- fancy constructors compiled from Schema definitions. An instance of a model is called a **_document_**
- models are responsible for creating and reading documents from the underlying mongodb database
