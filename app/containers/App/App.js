/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import FlightsPage from 'containers/FlightsPage/Loadable';
import NewFlightPage from 'containers/NewFlightPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import './style.scss';

const App = () => (
  <div>
    <Helmet
      titleTemplate="%s - Blue Ribbun Assignment"
      defaultTitle="Blue Ribbun Assignment"
    >
    </Helmet>
    <Switch>
      <Route exact path="/" component={FlightsPage} />
      <Route exact path="/new" component={NewFlightPage} />
      <Route exact path="/flights" component={FlightsPage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
