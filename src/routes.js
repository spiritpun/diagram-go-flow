import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import WorkflowDiagram from './pages/WorkflowDiagram';
import Form from './components/Form/FormContainer';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={WorkflowDiagram} />
          <Route path="/form" component={Form} />
        </Switch>
      </Router>
    );
  }
}
