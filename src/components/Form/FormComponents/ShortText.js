import React from 'react';

import { Draggable } from './style';

const ShortText = () => {
  return (
      <Draggable size="20px">
        <i className="material-icons" style={{ marginRight: 10 }}>short_text</i>
        Short Text
      </Draggable>
  );
};

export default ShortText;
