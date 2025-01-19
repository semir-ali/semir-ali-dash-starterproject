import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * This acts as a wrapper component for two arrays, one for unselected nodes and one for selected nodes
 */
export class NodeCollectionStore extends NodeStore {

    @observable
    public unselectedNodes: NodeStore[] = new Array<NodeStore>();

    @observable 
    public selectedNodes: NodeStore[] = new Array<NodeStore>();

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)"; // for CSS trnsform property
    }

    // Checks if there are any selected nodes on the canvas
    @computed
    public get hasSelectedNodes(): boolean {
        if (this.selectedNodes.length > 0) {
            return true;
        }
        return false;
    }

    // Adds a node to the unselected nodes array
    @action 
    public addNode(store: NodeStore): void {
        this.unselectedNodes.push(store);
    }

    // Adds a node to the selected nodes array
    @action
    public addSelectedNodes(store: NodeStore): void {
        this.selectedNodes.push(store)
    }
    // Removes node from selected nodes array
    @action
    public removeSelectedNode(store: NodeStore): void {
        const index = this.selectedNodes.indexOf(store)
        this.selectedNodes.splice(index, 1)
    }
    // Removes selected node from unselected and selected nodes array
    @action 
    public removeSelectedNodes(): void {
        this.selectedNodes.forEach((selectedNode) =>
            {const index = this.unselectedNodes.indexOf(selectedNode)
            this.unselectedNodes.splice(index, 1)})
        this.selectedNodes = new Array<NodeStore>();
    }
}