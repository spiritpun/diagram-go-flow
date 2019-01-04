import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import FormComponents from './FormComponents';
import FormBuilder from './FormBuilder';

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 3fr;
  grid-template-areas: 'side-bar main';
`;

class Form extends Component {
  render() {
    return (
      <Container className="container">
        <FormComponents />
        <FormBuilder />
      </Container>
    );
  }
}


export default DragDropContext(HTML5Backend)(Form);