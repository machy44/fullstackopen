import { gql } from '@apollo/client';
import { IPerson } from './types';

// fragments
const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
`;

// queries
export const FIND_PERSON = gql`
  ${PERSON_DETAILS}
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
`;

export const ALL_PERSONS = gql`
  query allPersons {
    allPersons {
      name
      phone
      id
    }
  }
`;

// mutations
export const CREATE_PERSON = gql`
  ${PERSON_DETAILS}
  mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      ...PersonDetails
    }
  }
`;

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export type PersonAddedSubscription = {
  personAdded: IPerson;
};

// subscriptions
export const PERSON_ADDED = gql`
  ${PERSON_DETAILS}
  subscription {
    personAdded {
      ...PersonDetails
    }
  }
`;
