## run single test

`npm test -- -t "of a bigger list is calculated right"` -> two dashes is used to pass arguments to npm-run-script
The provided parameter can refer to the name of the test or the describe block
`npm test -- -t 'notes'` -> describe block

or you can use `only` method https://jestjs.io/docs/api#testonlyname-fn-timeout

## debugging test

`node --inspect-brk node_modules/.bin/jest --runInBand [any other arguments here]`
https://jestjs.io/docs/troubleshooting

run tests only in that file
`npm test -- tests/note_api.test.js`

NB(nota bene): When running a single test, the mongoose connection might stay open if no tests using the connection are run. The problem might be due to the fact that supertest primes the connection, but Jest does not run the afterAll portion of the code.

We also added the runInBand option to the npm script that executes the tests. This option will prevent Jest from running tests in parallel; we will discuss its significance once our tests start using the database. -> runInBand can be useful for debugging also

## token based auth

The main reason for tokens:

1. stateless and scalable servers
2. mobile application ready
3. pass auth to other apps
4. extra security

## auth schemes

https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes

