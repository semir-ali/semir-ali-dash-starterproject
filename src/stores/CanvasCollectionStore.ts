import { computed, observable, action } from "mobx";
import { CanvasNodeStore } from "./CanvasNodeStore";

export class CanvasCollectionStore {
    @observable
    public canvasCollection: CanvasNodeStore[] = new Array<CanvasNodeStore>();

    @action
    public addCanvas(canvas: CanvasNodeStore) {
        this.canvasCollection.push(canvas)
    }
    
    @computed 
    public get renderedNode(): CanvasNodeStore {
        for (let node = 0; this.canvasCollection.length; node++) {
            if (this.canvasCollection[node].isRenderedNode) {
                return this.canvasCollection[node]
            }
        }
        return new CanvasNodeStore({isRenderedNode: false})
    }
}