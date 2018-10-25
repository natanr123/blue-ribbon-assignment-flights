export default class CalculationResult {
  constructor(response) {
    this.lines = response.lines;
    this.message = response.message;
    this.highest = response.highest;
    this.error = response.error;
  }
}
