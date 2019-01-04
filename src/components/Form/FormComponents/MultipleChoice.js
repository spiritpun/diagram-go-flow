import React from 'react';

import { Draggable } from './style';

const MultipleChoice = () => {
  return (
    <Draggable size="30px 20px">
      <i className="material-icons" style={{ marginRight: 10 }}>check_box</i>
      Multiple Choice
    </Draggable>
  );
};

export default MultipleChoice;
