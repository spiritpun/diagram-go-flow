import React from 'react';

import { Draggable } from './style';

const Image = () => {
  return (
    <Draggable size="20px">
      <i className="material-icons" style={{ marginRight: 10 }}>image</i>
      Image
    </Draggable>
  );
};

export default Image;
