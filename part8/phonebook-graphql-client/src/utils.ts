import { ApolloCache } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { IPerson } from './types';

export const updateCache = (
  cache: ApolloCache<{}>,
  query: Record<'query', DocumentNode>,
  addedPerson: IPerson,
) => {
  cache.updateQuery(query, ({ allPersons }) => {
    return { allPersons: uniqByName(allPersons.concat(addedPerson)) };
  });
};

export const uniqByName = (a: IPerson[]) => {
  let seen = new Set();
  return a.filter((item) => {
    let name = item.name;
    return seen.has(name) ? false : seen.add(name);
  });
};
