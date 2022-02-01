import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers } from 'redux';

const reducer = combineReducers({ anecdotes: anecdoteReducer, notification: notificationReducer });

export const store = createStore(reducer, composeWithDevTools());
