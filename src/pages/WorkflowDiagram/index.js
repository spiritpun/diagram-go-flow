import React from 'react'

import { WorkflowDiagramEditor } from '../../components/WorkflowDiagram';

const data = [
    { key: '1', text: 'First Stage' },
    { key: '2', text: 'First Sub-Stage', category: 'Loading' },
    { key: '3', text: 'Second Sub-Stage', category: 'Loading' },
    { key: '4', text: 'Third Sub-Stage', category: 'Loading' },
];


const links = [
    { from: '1', to: '2' },
    { from: '1', to: '3' },
    { from: '1', to: '4' },
];

export default () => <WorkflowDiagramEditor nodes={data} links={links} />;
