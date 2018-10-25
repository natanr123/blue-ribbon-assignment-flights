import * as constants from './constants';

export function flightsLoaded(flights) {
  return {
    type: constants.FLIGHTS_LOADED,
    flights,
  };
}
