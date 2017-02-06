import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Ten', 'Vs.');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Ten', 'Vs.')
      }));
    });

    it('converts to an immutable', () => {
      const state = Map();
      const entries = ['Vitalogy', 'No Code'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Vitalogy', 'No Code')
      }));
    });
  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Yield', 'Binaural', 'Riot Act')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Yield', 'Binaural')
        }),
        entries: List.of('Riot Act')
      }));
    });
  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Ten', 'Vs.')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Vs.');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Ten', 'Vs.'),
          tally: Map({
            'Vs.': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to  existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Ten', 'Vs.'),
          tally: Map({
            'Ten': 3,
            'Vs.': 3
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Ten');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Ten', 'Vs.'),
          tally: Map({
            'Ten': 4,
            'Vs.': 3
          })
        }),
        entries: List()
      }));
    });
  });
});

