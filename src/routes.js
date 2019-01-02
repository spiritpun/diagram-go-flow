import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import WorkflowDiagram from './pages/WorkflowDiagram';

export default () => (
  <Router>
    <Switch>
      <Route
        path="/"
        component={WorkflowDiagram}
      />
    </Switch>
  </Router>
);
