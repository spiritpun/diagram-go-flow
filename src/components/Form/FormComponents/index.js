import React, { Component } from 'react';
import styled from 'styled-components';

import Source from './DragNDrop/Source';
import ShortText from './ShortText';
import Paragraph from './Paragraph';
import SingleChoice from './SingleChoice';
import MultipleChoice from './MultipleChoice';
import Image from './Image';
import Attachments from './Attachments'

const Container = styled.div`
    grid-area: side-bar;

    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    margin: 20px 0 20px 20px;
`

class FormComponents extends Component {
  render() {
    return (
      <Container>
        <Source Component={ShortText} />
        <Source Component={Paragraph} />
        <Source Component={SingleChoice} />
        <Source Component={MultipleChoice} />
        <Source Component={Image} />
        <Source Component={Attachments} />
      </Container>
    );
  }
}

export default FormComponents;
