import anecdoteReducer, { incrementVote, addNewNote } from './anecdoteReducer'
import deepFreeze from 'deep-freeze'


describe('anecdoteReducer', () => {
  test('increment vote', () => {
    const defaultAction = {
      type: '',
    }

    const newState = anecdoteReducer(undefined, defaultAction);

    let updatedState = anecdoteReducer(newState, incrementVote(newState[0].id));
    deepFreeze(updatedState);
    expect(updatedState[0].votes).toBe(1);
    updatedState = anecdoteReducer(updatedState, incrementVote(newState[0].id));
    deepFreeze(updatedState);
    expect(updatedState[0].votes).toBe(2);
    updatedState = anecdoteReducer(updatedState, incrementVote(newState[1].id));
    deepFreeze(updatedState);
    expect(updatedState[1].votes).toBe(1);
  })
  test('add new anecdote', () => {
    let updatedState = anecdoteReducer(undefined, addNewNote("test anecdote"));
    deepFreeze(updatedState);
    expect(updatedState[updatedState.length - 1].content).toBe("test anecdote")

  });
  test('anecdotes are ordered by number of votes', () => {

  });
})