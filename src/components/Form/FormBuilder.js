import React, { Component } from 'react';
import styled from 'styled-components';

const BuilderContainer = styled.div`
  grid-area: main;

  display: flex;
  justify-content: center;
  margin: 20px 20px 20px 0;
  border: 1px solid gray;
`;

class FormBuilder extends Component {
  render() {
    return (
      <BuilderContainer>
        <div>Hello</div>
      </BuilderContainer>
    );
  }
}

export default FormBuilder;
