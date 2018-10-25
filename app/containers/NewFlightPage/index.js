/* eslint-disable react/prop-types */
import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import { Formik, Form, Field } from 'formik';
import FlightsService from 'services/FlightsService';
import reducer from './reducer';
import * as actions from './actions';

/* eslint-disable react/prefer-stateless-function */
export class NewFlightPage extends React.PureComponent {
  componentDidMount() {
  }

  onSubmit(values) {
    const flight = FlightsService.create(values);
    this.props.flightCreated(flight);
  }

  render() {
    const initialValues = {
      from: 'Tel Aviv',
      to: 'Haifa',
      departureTime: '2018-10-25 15:30',
      landingTime: '2018-10-25 17:30',
      price: 100.25,
    };
    return (
      <article>
        <Helmet>
          <title>NewFlightPage</title>
          <meta
            name="description"
            content="New Flight Page"
          />
        </Helmet>
        <div>
          <h1>New Flight Page</h1>
          <a href={'/flights'}>See Flights List</a>
          <Formik
            onSubmit={(values) => { this.onSubmit(values); }}
            initialValues={initialValues}
          >
            {({ values }) => (
              <Form>
                <span>From:</span>
                <Field
                  type={'text'}
                  name={'from'}
                  style={{ width: '300px', height: '30px' }}
                />
                <br />
                <span>To:</span>
                <Field
                  type={'text'}
                  name={'to'}
                  style={{ width: '300px', height: '30px' }}
                />
                <br />
                <span>Departure Time​:</span>
                <Field
                  type={'text'}
                  name={'departureTime'}
                  style={{ width: '300px', height: '30px' }}
                />
                <br />
                <span>LandingTime​​:</span>
                <Field
                  type={'text'}
                  name={'landingTime'}
                  style={{ width: '300px', height: '30px' }}
                />
                <br />
                <span>Price​:</span>
                <Field
                  type={'text'}
                  name={'price'}
                  style={{ width: '300px', height: '30px' }}
                />
                <br />
                <button type="submit">
                  Submit
                </button>
                <br />
                <br />
                {this.props.flight ?
                  <div className="alert alert-success" >
                    <span>A flight from </span>
                    <span>{this.props.flight.to}</span>
                    <span> to </span>
                    <span>{this.props.flight.to}</span>
                    <span> Was successfully created</span>
                  </div> : ''
                }
                <br />
                <br />
                <br />
                <div>
                  <p>Debug Section: </p>
                  <p>{JSON.stringify(values)}</p>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    flightCreated: (values) => {
      dispatch(actions.flightCreated(values));
    }
  };
}

const mapStateToProps = (state) => {
  const newFlightState = state.get('newFlight');
  return {
    flight: newFlightState.get('flight'),
  };
};

NewFlightPage.propTypes = {
  flightCreated: PropTypes.func,
  flight: PropTypes.any,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'newFlight', reducer });

export default compose(
  withReducer,
  withConnect,
)(NewFlightPage);
