import React from 'react';
import './App.scss';
import { CanvasCollectionStore, CanvasNodeStore, CanvasType, NodeCollectionStore, NodeStore, StaticTextNodeStore, StoreType, VideoNodeStore } from './stores';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';

const mainNodeCollection = new NodeCollectionStore();
const mainCanvasCollection = new CanvasCollectionStore();


export class App extends React.Component {
    render() {
        if (mainCanvasCollection.canvasCollection.length == 0) {
            const promptedCanvas = prompt("What canvas do you want displayed? \n A: FreeformCanvas", "A") 
            if (promptedCanvas === "A") {
                mainCanvasCollection.canvasCollection.push(new CanvasNodeStore({isRenderedNode: true, canvasType: CanvasType.FreeformCanvas}))
            }
        }
        if (mainCanvasCollection.canvasCollection[0].canvasType == CanvasType.FreeformCanvas) {
            return (
            <div className="App">
                <FreeFormCanvas store={mainCanvasCollection.canvasCollection[0].childrenNodes} /> 
            </div>
            )
        }
    }
}

export default App;