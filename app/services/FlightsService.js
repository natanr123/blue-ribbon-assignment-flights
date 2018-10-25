// Just to simulate server side

export default class FlightsService {
  static create(values) {
    let current = FlightsService.list();
    if (!(Array.isArray(current))) {
      current = [];
    }
    current.push(values);
    localStorage.setItem('flights', JSON.stringify(current));
  }
  static clear() {
    localStorage.setItem('flights', JSON.stringify([]));
  }
  static list() {
    return JSON.parse(localStorage.getItem('flights'));
  }
};
