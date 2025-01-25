import React from 'react';
import './App.scss';
import { CanvasCollectionStore, CanvasNodeStore } from './stores';
import { FreeFormCanvas } from './views/nodes/freeformcanvas/FreeFormCanvas';
import { CanvasType } from './stores';
import { SideBar } from './views/sidebar/SideBar';
import { observer } from 'mobx-react';

const mainCanvasCollection = new CanvasCollectionStore();

@observer
export class Website extends React.Component {
    render() {
        // Determines first canvas
        if (mainCanvasCollection.canvasCollection.length === 0) {
            const promptedCanvas = prompt("What canvas do you want displayed? \n A: FreeformCanvas", "A");
            if (promptedCanvas === "A") {
                mainCanvasCollection.addCanvas(new CanvasNodeStore({isRenderedNode: true, canvasType: CanvasType.FreeformCanvas}));
            }
        }
        if (mainCanvasCollection.renderedNode.canvasType === CanvasType.FreeformCanvas) {
            return (
            <div>
                <FreeFormCanvas store={mainCanvasCollection.renderedNode} collection={mainCanvasCollection.renderedNode.childrenNodes} />;
                <SideBar currentCanvas={mainCanvasCollection.renderedNode} canvasCollection={mainCanvasCollection}/>;
            </div>
            )
        }
    }
}

export default Website;