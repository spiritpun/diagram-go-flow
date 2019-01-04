import React from 'react';

import { Draggable } from './style';

const Paragraph = () => {
    return (
        <Draggable size="30px 20px">
        <i className="material-icons" style={{ marginRight: 10 }}>notes</i>
          Paragraph
        </Draggable>
    )
}

export default Paragraph;
