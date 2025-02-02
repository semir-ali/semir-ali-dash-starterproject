import { action, observable} from "mobx";
import { NodeStore } from "./NodeStore";
import { NodeCollectionStore } from "./NodeCollectionStore";
import { Constants } from "../Constants";

export enum CanvasType {
    FreeformCanvas,
    Grid
}

export enum CanvasMode {
    defaultMode = Constants.NORMAL_BACKGROUND_BRIGHTNESS,
    darkMode = Constants.DARK_BACKGROUND_BRIGHTNESS,
    lightMode = Constants.BRIGHT_BACKGROUND_BRIGHTNESS
}
/**
 * This acts as a wrapper component for two arrays, one for unselected nodes and one for selected nodes
 */
export class CanvasNodeStore extends NodeStore {
    constructor(initializer: Partial<CanvasNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    // Pointer to the exterior canvas outside of a canvas
    @observable
    public prevNode: CanvasNodeStore | undefined;

    // The individual nodes of the canvas
    @observable 
    public childrenNodes: NodeCollectionStore = new NodeCollectionStore();

    // Determines if the node is the rendered node (meaning it is the backdrop of the scene)
    @observable
    public isRenderedNode: boolean = false;

    @observable
    public canvasType: CanvasType | null = null;

    @observable
    public mode: CanvasMode | CanvasMode = CanvasMode.defaultMode;

    @action
    public switchModes = () => {
        console.log(this.mode)
        if (this.mode === CanvasMode.defaultMode) {
            this.mode = CanvasMode.darkMode
        }
        else if (this.mode === CanvasMode.darkMode) {
            this.mode = CanvasMode.lightMode
        }
        else {
            this.mode = CanvasMode.defaultMode;
        }
    }
}