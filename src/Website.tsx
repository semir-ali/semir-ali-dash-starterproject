import React from 'react';
import './App.scss';
import { CanvasCollectionStore, CanvasNodeStore, NodeCollectionStore } from './stores';
import { FreeFormCanvas } from './views/nodes/freeformcanvas/FreeFormCanvas';
import { CanvasType } from './stores';
import { HotBar } from './views/HotBar/HotBar';
import { observer } from 'mobx-react';
import { GridCanvas } from './views/nodes/GridCanvas/GridCanvas';

const mainCanvasCollection = new CanvasCollectionStore();

// Acts as a sort of "Game" component for the whole website, allows user input for creating a canvas
@observer
export class Website extends React.Component {
    render() {
        // Allows the user to choose the displayed canvas
        if (mainCanvasCollection.canvasCollection.length === 0) {
            var promptedCanvas = prompt("What canvas do you want displayed? \n A: FreeformCanvas \n B: GridCanvas", "A");
            if (promptedCanvas === "A") {
                mainCanvasCollection.addCanvas(new CanvasNodeStore({isRenderedNode: true, canvasType: CanvasType.FreeformCanvas}));
            }
            if (promptedCanvas === "B") {
                mainCanvasCollection.addCanvas(new CanvasNodeStore({isRenderedNode: true, canvasType: CanvasType.Grid}));
            }
        }
        // Renders the type of canvas based on prompted canvas
        if (mainCanvasCollection.renderedNode.canvasType === CanvasType.FreeformCanvas) {
            return (
            <div>
                <HotBar currentCanvas={mainCanvasCollection.renderedNode} canvasCollection={mainCanvasCollection}/>
                <FreeFormCanvas store={mainCanvasCollection.renderedNode} nodeCollection={mainCanvasCollection.renderedNode.childrenNodes} 
                previousCollection={(mainCanvasCollection.renderedNode.prevNode !== undefined? mainCanvasCollection.renderedNode.prevNode : mainCanvasCollection.renderedNode.childrenNodes) as NodeCollectionStore} canvasType={CanvasType.FreeformCanvas}/>
            </div>
            )
        }
        if (mainCanvasCollection.renderedNode.canvasType === CanvasType.Grid) {
            return (
            <div>
                <HotBar currentCanvas={mainCanvasCollection.renderedNode} canvasCollection={mainCanvasCollection}/>
                <GridCanvas store={mainCanvasCollection.renderedNode} nodeCollection={mainCanvasCollection.renderedNode.childrenNodes}
                previousCollection={(mainCanvasCollection.renderedNode.prevNode !== undefined? mainCanvasCollection.renderedNode.prevNode : mainCanvasCollection.renderedNode.childrenNodes) as NodeCollectionStore} canvasType={CanvasType.Grid} />
            </div>
            )
        }
    }
}

export default Website;