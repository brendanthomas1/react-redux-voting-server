import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Ten']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Ten']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Ten', 'Vs.']
    });
    const action = { type: 'NEXT' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Ten', 'Vs.']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Ten', 'Vs.']
      },
      entries: []
    });
    const action = { type: 'VOTE', entry: 'Vs.' }
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Ten', 'Vs.'],
        tally: { 'Vs.': 1 }
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['No Code', 'Yield'] };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['No Code', 'Yield']
    }));
  });

  it('can be used with reduce()', () => {
    const actions = [
      { type: 'SET_ENTRIES', entries: ['Ten', 'Vs.'] },
      { type: 'NEXT' },
      { type: 'VOTE', entry: 'Ten' },
      { type: 'VOTE', entry: 'Vs.' },
      { type: 'VOTE', entry: 'Ten' },
      { type: 'NEXT' }
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Ten'
    }));
  });
});
