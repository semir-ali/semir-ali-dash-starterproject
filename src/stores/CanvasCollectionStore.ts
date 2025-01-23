import { computed, observable, action } from "mobx";
import { CanvasNodeStore } from "./CanvasNodeStore";

export class CanvasCollectionStore {
    @observable
    public canvasCollection: CanvasNodeStore[] = new Array<CanvasNodeStore>();

    @computed
    public findRenderedNode(): CanvasNodeStore {
        this.canvasCollection.forEach((canvas) => 
        {if (canvas.isRenderedNode) {
            return canvas
        }})
        // random node
        return new CanvasNodeStore({isRenderedNode: false})
    }

    @action
    public addCanvas(canvas: CanvasNodeStore) {
        this.canvasCollection.push(canvas)
    }
}