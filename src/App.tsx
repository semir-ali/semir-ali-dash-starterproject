import React from 'react';
import './App.scss';
import { CanvasCollectionStore, CanvasNodeStore, NodeCollectionStore, NodeStore, StaticTextNodeStore, StoreType, VideoNodeStore } from './stores';
import { FreeFormCanvas } from './views/nodes/freeformcanvas/FreeFormCanvas';
import { CanvasType } from './stores';

//
const mainCanvasCollection = new CanvasCollectionStore();

export class App extends React.Component {
    render() {
        if (mainCanvasCollection.canvasCollection.length === 0) {
            const promptedCanvas = prompt("What canvas do you want displayed? \n A: FreeformCanvas", "A") 
            if (promptedCanvas === "A") {
                mainCanvasCollection.addCanvas(new CanvasNodeStore({isRenderedNode: true, canvasType: CanvasType.FreeformCanvas}))
            }
        }
        if (mainCanvasCollection.renderedNode.canvasType === CanvasType.FreeformCanvas) {
            return (
            <div className="App">
                <FreeFormCanvas store={mainCanvasCollection.renderedNode} collection={mainCanvasCollection.renderedNode.childrenNodes} /> 
            </div>
            )
        }
    }
}

export default App;