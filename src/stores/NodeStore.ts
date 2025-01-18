import { computed, observable } from "mobx";
import { Utils } from "../Utils";

export enum StoreType {
    Text, 
    Video,
    Image,
    Website
}

// Let's say there's three ways a node could be
// It could be unplaced (just selected)
// Could be unselected (placed but not chosen, able to be moved around)
// Could be selected (placed, chosen, not able to be moved around, able to be resized and removed)

export enum NodePosition {
    Unplaced,
    Unselected,
    Selected
}

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
    public selected: boolean = false;

    @observable 
    public placed: boolean = false;

    @observable
    public opacity: number = .5;

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px, " + this.y + "px)";
    }
}