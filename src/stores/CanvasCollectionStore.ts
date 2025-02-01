import { computed, observable, action } from "mobx";
import { CanvasNodeStore } from "./CanvasNodeStore";

// Wrapper class for all the potential canvases that could represent the nodes onscreen
export class CanvasCollectionStore {

    @observable
    public canvasCollection: CanvasNodeStore[] = new Array<CanvasNodeStore>();

    @action
    public addCanvas(canvas: CanvasNodeStore) {
        this.canvasCollection.push(canvas)
    }
    
    // Makes "rendered" canvas the backdrop of the website as opposed to a resizable node
    @computed 
    public get renderedNode(): CanvasNodeStore {
        for (let node = 0; this.canvasCollection.length; node++) {
            if (this.canvasCollection[node].isRenderedNode) {
                return this.canvasCollection[node]
            }
        }
        // abitrary unrendered node (unreachable)
        return new CanvasNodeStore({isRenderedNode: false})
    }
}