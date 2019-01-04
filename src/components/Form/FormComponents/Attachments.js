import React from 'react';

import { Draggable } from './style';

const Attachments = () => {
  return (
    <Draggable size="20px">
      <i className="material-icons" style={{ marginRight: 10 }}>attachment</i>
      Attachments
    </Draggable>
  );
};

export default Attachments;
