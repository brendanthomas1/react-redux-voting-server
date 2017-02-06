import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next} from '../src/core';

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
});

