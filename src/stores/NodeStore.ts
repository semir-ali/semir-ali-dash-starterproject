import { computed, observable } from "mobx";
import { Utils } from "../Utils";
import { Constants } from "../Constants";

export enum StoreType {
    Text, 
    Video,
    Image,
    Website,
    Audio,
    FreeformCanvas,
    Grid
}

/**
 * This enum represents the three position states that the node could be
 * It could be unplaced, meaning that it was just generated 
 * It could be unselected, meaning it has been placed and movable (but not selected)
 * Or it could be selected, meaning it is removable and resizable
 */
/**
 * This enum represents the three position states that the node could be
 * It could be unplaced, meaning that it was just generated 
 * It could be unselected, meaning it has been placed and movable (but not selected)
 * Or it could be selected, meaning it is removable and resizable
 */

export enum NodePosition {
    Unplaced,
    Unselected,
    Selected
}

export enum ResizableNodesVisibility {
    Hidden = "hidden",
    Visible = "visible"
}

// Contains all the information for all nodes
export class NodeStore {

    public Id: string = Utils.GenerateGuid();

    public type: StoreType | null = null;

    @observable
    public linkedNode: boolean = false;

    @observable
    public position: NodePosition | NodePosition = NodePosition.Unplaced;
    
    @observable
    public width: number = Constants.INITIAL_NODE_WIDTH;

    @observable
    public height: number = Constants.INITIAL_NODE_HEIGHT;

    @observable
    public x: number = Constants.INITIAL_NODE_X_POSITION;

    @observable 
    public centerX: number = this.x + (this.width / 2);

    @observable
    public y: number = Constants.INITIAL_NODE_Y_POSITION;

    @observable
    public centerY: number = this.y + (this.height/2);

    @observable
    public xOffset: number = 0;

    @observable
    public yOffset: number = 50;

    @observable
    public resizableNodeVisibility: ResizableNodesVisibility | ResizableNodesVisibility = ResizableNodesVisibility.Hidden;

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px, " + this.y + "px)";
    }
}