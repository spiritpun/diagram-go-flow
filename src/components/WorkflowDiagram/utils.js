import { get } from 'lodash';

function blindByPositin(actionNodeKey, newNodeKey, parentNodeKey, position) {
    switch(position) {    
        case 'parent':
            return [{ from: parentNodeKey, to: newNodeKey }, { from: newNodeKey, to: actionNodeKey }];
        case 'sibling':
            return [{ from: parentNodeKey, to: newNodeKey }];
        default:
            return [{ from: actionNodeKey, to: newNodeKey }];
    }
}
  
export function addNodeAndLink({ part: node }, position) {
    const diagram = node.diagram;
    diagram.startTransaction('Add State');
    // get the node data for which the user clicked the button
    const fromData = node.data;
    // create a new 'State' data object, positioned off to the right of the node
    const p = node.location.copy();
    p.x += diagram.toolManager.draggingTool.gridSnapCellSize.width;
    const toData = {
        text: 'new',
        loc: go.Point.stringify(p)
    };
    // add the new node data to the model
    const model = diagram.model;
    model.addNodeData(toData);

    const actionNode = diagram.findNodeForKey(node.data.key);
    const parentNode = actionNode.findTreeParentNode();
    const parentNodeLink = actionNode.findTreeParentLink();

    // create a link data from the old node data to the new node data
    const linkData = blindByPositin(
        model.getKeyForNodeData(fromData),
        model.getKeyForNodeData(toData),
        get(parentNode, 'key', undefined),
        position
    );

    if (parentNodeLink && position === 'parent') {
        model.removeLinkData(actionNode.findTreeParentLink().data);
    }
    model.addLinkDataCollection(linkData);
    // select the new Node
    const newNode = diagram.findNodeForData(toData);
    diagram.select(newNode);
    // snap the new node to a valid location
    newNode.location = diagram.toolManager.draggingTool.computeMove(newNode, p);

    diagram.commitTransaction('Add State');
};

export function deleteNode(event, { part: node }) {
    const nodePart = node.adornedPart;
    nodePart.diagram.select(nodePart);
    event.diagram.commandHandler.deleteSelection();
};
