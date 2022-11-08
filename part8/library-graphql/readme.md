part8 server project

lib for avoiding n+1 problem https://github.com/graphql/dataloader

faker api: https://fakerjs.dev/api/

check this for testing:

test your schema with eslint-plugin-graphql and schema-graphql-linter (take a look)
test your queries and mutations with EasyGraphQL Tester
test your resolvers like you would test any other Javascript function. ?

for server:

- unit test (I dont see the point to do unit tests on resolvers. unit tests should be used for some logic in some functions with certain business logic inside)
- apollo-server-testing(integrations-testing) => construct TestServer -> I didnt understand this and how ti functions. (take a look)
- I saw one guy is doing snapshots of requests/response. (take a look)
- e2e testing -> http request(I used supertest)
