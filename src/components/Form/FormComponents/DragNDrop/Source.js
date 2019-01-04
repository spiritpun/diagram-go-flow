import React from 'react';
import { DragSource } from 'react-dnd';

// Set Type of Source Property
const Card = 'card';

// Set drag behaviour of Source Property
const source = {
    // Set what is being dragged
  beginDrag(props) {
    const { item } = props;
    console.log(props)
    return { item };
  },

  // Set what happens when you drop the Source Property 
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
  },
};

// Set variables of Source Property when it is being dragged
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const Source = ({ Component, connectDragSource, isDragging }) => {
  return connectDragSource(
    <div style={{
        opacity: isDragging ? 0.25 : 1,
       }}>
        <Component />
    </div>
  );
};

export default DragSource(Card, source, collect)(Source);
