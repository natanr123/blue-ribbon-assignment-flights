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
            content="NewFlightPage"
          />
        </Helmet>
        <div>
          <h1>NewFlightPage</h1>
          <Formik
            onSubmit={(values) => { this.props.onSubmit(values); }}
            initialValues={initialValues}
          >
            {({ values }) => (
              <Form>
                <span>From:</span>
                <Field
                  type={'text'}
                  name={'from'}
                  style={{ width: '300px', height: '30px', border: 'solid' }}
                />
                <br />
                <span>To:</span>
                <Field
                  type={'text'}
                  name={'to'}
                  style={{ width: '300px', height: '30px', border: 'solid' }}
                />
                <br />
                <span>Departure Time​:</span>
                <Field
                  type={'text'}
                  name={'departureTime'}
                  style={{ width: '300px', height: '30px', border: 'solid' }}
                />
                <br />
                <span>LandingTime​​:</span>
                <Field
                  type={'text'}
                  name={'landingTime'}
                  style={{ width: '300px', height: '30px', border: 'solid' }}
                />
                <br />
                <span>Price​:</span>
                <Field
                  type={'text'}
                  name={'price'}
                  style={{ width: '300px', height: '30px', border: 'solid' }}
                />
                <br />
                <button type="submit" variant="contained" color="primary">
                  Submit
                </button>
                <br />
                <span>{JSON.stringify(values)}</span>
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
    onSubmit: (values) => {
      FlightsService.create(values);
      // console.log(FlightsService.list());
      dispatch(actions.createFlight());
    }
  };
}

const mapStateToProps = (state) => {
  const newFlight = state.get('newFlight');
  return {
    env: newFlight.get('env'),
  };
};

NewFlightPage.propTypes = {
  onSubmit: PropTypes.func,
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
