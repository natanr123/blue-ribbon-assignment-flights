/* eslint-disable react/prop-types */
import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import FlightsService from 'services/FlightsService';
import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';
import reducer from './reducer';
import * as actions from './actions';

/* eslint-disable react/prefer-stateless-function */
export class FlightsPage extends React.PureComponent {
  componentDidMount() {
    this.loadFlights();
  }

  loadFlights() {
    const flights = FlightsService.list();
    this.props.flightsLoaded(flights);
  }

  clearFlights() {
    FlightsService.clear();
    const flights = FlightsService.list();
    this.props.flightsLoaded(flights);
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>FlightsPage</title>
          <meta
            name="description"
            content="FlightsPage"
          />
        </Helmet>
        <div>
          <h1>Flights</h1>
        </div>
        <button onClick={() => { this.clearFlights(); }}>Clear Flights</button>
        <a href={'/new'}>Create New Flight</a>
        {this.props.flights ?
          <Grid
            rows={this.props.flights}
            columns={[
              { name: 'from', title: 'From' },
              { name: 'to', title: 'To' },
              { name: 'departureTime', title: 'Departure Time' },
              { name: 'landingTime', title: 'Landing Time' },
              { name: 'price', title: 'Price' },
            ]}
          >
            <FilteringState defaultFilters={[]} />
            <IntegratedFiltering />
            <Table />
            <TableHeaderRow />
            <TableFilterRow />
          </Grid> : <p> No Flights Data </p>
        }
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    flightsLoaded: (arr) => {
      dispatch(actions.flightsLoaded(arr));
    },
  };
}

const mapStateToProps = (state) => {
  const flightsState = state.get('flights');
  return {
    flights: flightsState.get('flights'),
  };
};

FlightsPage.propTypes = {
  flightsLoaded: PropTypes.func,
  flights: PropTypes.any,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'flights', reducer });

export default compose(
  withReducer,
  withConnect,
)(FlightsPage);
