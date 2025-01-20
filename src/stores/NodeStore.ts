import { computed, observable } from "mobx";
import { Utils } from "../Utils";

export enum StoreType {
    Text, 
    Video,
    Image,
    Website
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
    public position: NodePosition | NodePosition = NodePosition.Unplaced;

    @observable
    public x: number = 0;

    @observable
    public y: number = 0;

    @observable
    public width: number = 600;

    @observable
    public height: number = 500;

    @observable
    public border: string = "4px";

    @observable
    public outline: string = "transparent";

    @observable
    public opacity: number = .5;

    @observable
    public resizableNodeVisibility: ResizableNodesVisibility | ResizableNodesVisibility = ResizableNodesVisibility.Hidden;

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px, " + this.y + "px)";
    }
}