import { fromJS } from 'immutable';
import * as constants from './constants';

export const initialState = fromJS(
  {
    flights: null,
  }
);

function problemReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FLIGHTS_LOADED:
      return state.set('flights', action.flights);
    default:
      return state;
  }
}

export default problemReducer;
