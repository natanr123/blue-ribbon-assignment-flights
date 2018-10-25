import * as constants from './constants';

export function flightCreated(flight) {
  return {
    type: constants.FLIGHT_CREATED,
    flight
  };
}

