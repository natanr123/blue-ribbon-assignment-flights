import { fromJS } from 'immutable';
import * as constants from './constants';

export const initialState = fromJS(
  {
    env: null,
  }
);

function problemReducer(state = initialState, action) {
  switch (action.type) {
    case constants.CREATE_FLIGHT:
      return state.set('env', action.env);
    default:
      return state;
  }
}

export default problemReducer;
