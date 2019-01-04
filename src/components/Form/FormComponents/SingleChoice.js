import React from 'react';

import { Draggable } from './style';

const SingleChoice = () => {
  return (
    <Draggable size="20px">
      <i className="material-icons" style={{ marginRight: 10 }}>radio_button_checked</i>
      Single Choice
    </Draggable>
  );
};

export default SingleChoice;
