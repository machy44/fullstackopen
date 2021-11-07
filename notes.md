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
