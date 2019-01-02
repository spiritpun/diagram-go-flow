import React, { Component } from 'react';
import PropTypes from 'prop-types';
import go from 'gojs';
import { addNodeAndLink, deleteNode } from './utils';

const goObj = go.GraphObject.make;

const rootNodeHoverAdornment = goObj(go.Adornment, 'Spot', {
  background: 'transparent',
  // hide the Adornment when the mouse leaves it
  mouseLeave: (_, { part: node }) => node.adornedPart.removeAdornment('mouseHover'),
  },
  goObj(go.Placeholder, {
    // to allow this Placeholder to be 'seen' by mouse events
    background: 'transparent',
    // needed because this is in a temporary Layer
    isActionable: true,
    click: (_, { part: node }) => {
      const nodePart = node.adornedPart;
      nodePart.diagram.select(nodePart);
    }
  }),
  goObj(go.Panel, 'Auto',
      { alignment: new go.Spot(0.9, 1.5), cursor: 'pointer', isActionable: true, click: (_, node) => addNodeAndLink(node, 'child') },
      goObj(go.Shape, 'Circle', { width: 22, height: 22, fill: 'white', stroke: 'dodgerblue', strokeWidth: 3 }),
      goObj(go.Shape, 'PlusLine', { width: 11, height: 11, fill: null, stroke: 'dodgerblue', strokeWidth: 3 }),
  ),
);

const nodeHoverAdornment = goObj(go.Adornment, 'Spot', {
  background: 'transparent',
  // hide the Adornment when the mouse leaves it
  mouseLeave: (_, { part: node }) => node.adornedPart.removeAdornment('mouseHover'),
  },
  goObj(go.Placeholder, {
    // to allow this Placeholder to be 'seen' by mouse events
    background: 'transparent',
    // needed because this is in a temporary Layer
    isActionable: true,
    click: (_, { part: node }) => {
      const nodePart = node.adornedPart;
      nodePart.diagram.select(nodePart);
    }
  }),
  goObj(go.Panel, 'Auto',
      { alignment: new go.Spot(0, 0), cursor: 'pointer', isActionable: true, click: deleteNode },
      goObj(go.Shape, 'Circle', { width: 18, height: 18, fill: 'gray', stroke: null }),
      goObj(go.Shape, 'XLine', { width: 7, height: 7, stroke: 'white', strokeWidth: 3 }),
  ),
  goObj(go.Panel, 'Auto',
      { alignment: new go.Spot(0.9, -0.5), cursor: 'pointer', isActionable: true, click: (_, node) => addNodeAndLink(node, 'parent') },
      goObj(go.Shape, 'Circle', { width: 22, height: 22, fill: 'white', stroke: 'dodgerblue', strokeWidth: 3 }),
      goObj(go.Shape, 'PlusLine', { width: 11, height: 11, fill: null, stroke: 'dodgerblue', strokeWidth: 3 }),
  ),
  goObj(go.Panel, 'Auto',
      { alignment: new go.Spot(1.1, 0.5, 8), cursor: 'pointer', isActionable: true, click: (_, node) => addNodeAndLink(node, 'sibling') },
      goObj(go.Shape, 'Circle', { width: 22, height: 22, fill: 'white', stroke: 'dodgerblue', strokeWidth: 3 }),
      goObj(go.Shape, 'PlusLine', { width: 11, height: 11, fill: null, stroke: 'dodgerblue', strokeWidth: 3 }),
  ),
  goObj(go.Panel, 'Auto',
      { alignment: new go.Spot(0.9, 1.5), cursor: 'pointer', isActionable: true, click: (_, node) => addNodeAndLink(node, 'child') },
      goObj(go.Shape, 'Circle', { width: 22, height: 22, fill: 'white', stroke: 'dodgerblue', strokeWidth: 3 }),
      goObj(go.Shape, 'PlusLine', { width: 11, height: 11, fill: null, stroke: 'dodgerblue', strokeWidth: 3 }),
  ),
);
export default class WorkflowDiagramEditor extends Component {
  constructor(props) {
    super(props);
    this.diagram;
    this.renderCanvas = this.renderCanvas.bind(this);
    this.diagramRef = React.createRef();
  }

  renderCanvas() {
    this.diagram = goObj(go.Diagram, this.diagramRef.current, {
      // The specific point at the very center of the bounding rectangle.
      initialContentAlignment: go.Spot.Center,
      /**
       * Diagrams with this autoScale type, used as the value of Diagram.autoScale,
       * are scaled uniformly until the whole documentBounds fits in the view.
       */
      initialAutoScale: go.Diagram.Uniform,
      layout: goObj(go.TreeLayout, {
        angle: 90,
        // default arrangement is ArrangementVertical
        arrangement: go.TreeLayout.ArrangementHorizontal,
      }),
      // turn off automatic animations
      'animationManager.isEnabled': false,
      'undoManager.isEnabled': false,
      isReadOnly: true,
    });

    this.diagram.nodeTemplate = goObj(go.Node, 'Auto', 
      goObj(go.Shape, 'RoundedRectangle',
        { stroke: '#EEE', strokeWidth: 2, fill: 'white' },
        new go.Binding('fill'),
        new go.Binding('stroke'),
      ),
      goObj(go.TextBlock,
        { font: 'bold 12pt Arial, sans-serif', margin: 10 },
        new go.Binding('text'),
      ),
      {
        mouseHover: (_, { part: node }) => {
          const actionNode = this.diagram.findNodeForKey(node.data.key);
          if (!Boolean(actionNode.findTreeParentNode())) {
            rootNodeHoverAdornment.adornedObject = node;
            node.addAdornment('mouseHover', rootNodeHoverAdornment);
          } else {
            nodeHoverAdornment.adornedObject = node;
            node.addAdornment('mouseHover', nodeHoverAdornment);
          }
        },
      }
    );

    this.diagram.linkTemplate = goObj(go.Link, {
        routing: go.Link.AvoidsNodes,  // Orthogonal or AvoidsNodes
        curve: go.Link.JumpOver,
        corner: 10,
      },
      goObj(go.Shape, { strokeWidth: 2 }),
      goObj(go.Shape, { toArrow: 'Standard' })
    );

    this.diagram.groupTemplate = goObj(go.Group, 'Auto', {
        // define the group's internal layout
        layout: goObj(go.TreeLayout, {
          angle: 90,
          arrangement: go.TreeLayout.ArrangementHorizontal,
          isRealtime: false,
        })
      },
      goObj(go.Shape, 'Rectangle',
        { fill: null, stroke: 'gray', strokeWidth: 2 },
        new go.Binding('fill'),
        new go.Binding('stroke'),
      ),
      goObj(go.Panel, 'Vertical',
        { defaultAlignment: go.Spot.TopCenter, margin: 6 },
        goObj(go.TextBlock,
          { font: 'bold 18px Arial, sans-serif', margin: 6 },
          new go.Binding('text')),
        // create a placeholder to represent the area where the contents of the group are
        goObj(go.Placeholder,
          { padding: new go.Margin(0, 10) }
        ),
      )
    );

    const { nodes, links } = this.props;
    this.diagram.model = new go.GraphLinksModel(nodes, links);
  }

  componentDidMount() {
    this.renderCanvas();
  }

  componentWillUpdate(nextProps) {
    const { nodes, links } = nextProps;
    this.diagram.model = new go.GraphLinksModel(nodes, links);
  }

  render() {
    return (<div
      ref={this.diagramRef}
      style={{ 'width': '900px', 'height': '500px', 'backgroundColor': '#FCFCFC' }}
    />);
  }
}

WorkflowDiagramEditor.propTypes = {
  nodes: PropTypes.array.isRequired,
  links: PropTypes.array.isRequired,
};

WorkflowDiagramEditor.defaultProps = {
  nodes: [],
  links: [],
};