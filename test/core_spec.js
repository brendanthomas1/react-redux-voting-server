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

    it('puts the winner of the current vote back in entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Ten', 'Vs.'),
          tally: Map({
            'Ten': 4,
            'Vs.': 2
          })
        }),
        entries: List.of('Vitalogy', 'No Code', 'Yield')
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Vitalogy', 'No Code')
        }),
        entries: List.of('Yield', 'Ten')
      }));
    });

    it('puts both from a tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Ten', 'Vs.'),
          tally: Map({
            'Ten': 3,
            'Vs.': 3
          })
        }),
        entries: List.of('Vitalogy', 'No Code', 'Yield')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Vitalogy', 'No Code')
        }),
        entries: List.of('Yield', 'Ten', 'Vs.')
      }));
    });

    it('marks the winner when theres only one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Vs.', 'No Code'),
          tally: Map({
            'Vs.': 5,
            'No Code': 3
          })
        }),
        entries: List()
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        winner: 'Vs.'
      }));
    });
  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Ten', 'Vs.')
      });
      const nextState = vote(state, 'Vs.');

      expect(nextState).to.equal(Map({
        pair: List.of('Ten', 'Vs.'),
        tally: Map({
          'Vs.': 1
        })
      }));
    });

    it('adds to  existing tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Ten', 'Vs.'),
        tally: Map({
          'Ten': 3,
          'Vs.': 3
        })
      });
      const nextState = vote(state, 'Ten');

      expect(nextState).to.equal(Map({
        pair: List.of('Ten', 'Vs.'),
        tally: Map({
          'Ten': 4,
          'Vs.': 3
        })
      }));
    });
  });
});
