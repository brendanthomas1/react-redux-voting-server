import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries} from '../src/core';

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
});

