import { fromJS } from 'immutable';
import * as constants from './constants';

export const initialState = fromJS(
  {
    flightCreated: null,
  }
);

function problemReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FLIGHT_CREATED:
      return state.set('flight', action.flight);
    default:
      return state;
  }
}

export default problemReducer;
