# guidelines for using this project

## general info

- project is created with [CRA](https://create-react-app.dev/).
- This project uses [redux-toolkit](https://redux-toolkit.js.org/) for state and
  [RTK](https://redux-toolkit.js.org/rtk-query/overview) for fetching and caching data.
- [react router v6](https://reactrouter.com/docs/en/v6/getting-started/overview) is used for routing.
- [react hook forms](https://react-hook-form.com/) with yup are used for form validations

## development

1. [install npm and node](https://nodejs.org/en/download/) -> `npm` is included in `node.js` installation
2. run `npm install`
3. run `npm start`

## tests

[RTL](https://testing-library.com/docs/react-testing-library/intro/) and [jest](https://jestjs.io/) are used for unit tests
[cypress](https://www.cypress.io/) is used for integration tests

- script to run unit tests `npm run test`
- script to run cypress tests with gui `npm run cypress:open`
- script to run cypress without gui cypress:run

## Implement components

- [Chakra UI](https://chakra-ui.com/) is used to create and style react components
- [Storybook](https://storybook.js.org/) is used to implement components in isolation
