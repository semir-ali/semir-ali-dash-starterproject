import React from 'react';
import './App.scss';
import { CanvasCollectionStore, CanvasNodeStore } from './stores';
import { FreeFormCanvas } from './views/nodes/freeformcanvas/FreeFormCanvas';
import { CanvasType } from './stores';
import { SideBar } from './views/sidebar/SideBar';
import { observer } from 'mobx-react';
import { GridCanvas } from './views/nodes/GridCanvas/GridCanvas';

const mainCanvasCollection = new CanvasCollectionStore();

@observer
export class Website extends React.Component {
    render() {
        console.log("Tick tock!");
        // Determines first canvas
        if (mainCanvasCollection.canvasCollection.length === 0) {
            const promptedCanvas = prompt("What canvas do you want displayed? \n A: FreeformCanvas \n B: GridCanvas", "A");
            if (promptedCanvas === "A") {
                mainCanvasCollection.addCanvas(new CanvasNodeStore({isRenderedNode: true, canvasType: CanvasType.FreeformCanvas}));
            }
            if (promptedCanvas === "B") {
                mainCanvasCollection.addCanvas(new CanvasNodeStore({isRenderedNode: true, canvasType: CanvasType.Grid}));
            }
        }
        // Renders the type of canvas
        if (mainCanvasCollection.renderedNode.canvasType === CanvasType.FreeformCanvas) {
            return (
            <div>
                <SideBar currentCanvas={mainCanvasCollection.renderedNode} canvasCollection={mainCanvasCollection}/>;
                <FreeFormCanvas store={mainCanvasCollection.renderedNode} collection={mainCanvasCollection.renderedNode.childrenNodes} />;
            </div>
            )
        }
        if (mainCanvasCollection.renderedNode.canvasType === CanvasType.Grid) {
            return (
            <div>
                <SideBar currentCanvas={mainCanvasCollection.renderedNode} canvasCollection={mainCanvasCollection}/>
                <GridCanvas store={mainCanvasCollection.renderedNode} collection={mainCanvasCollection.renderedNode.childrenNodes} />
            </div>
            )
        }
    }
}

export default Website;