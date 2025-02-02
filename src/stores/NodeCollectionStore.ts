import { computed, observable, action } from "mobx";
import { NodeStore, ResizableNodesVisibility } from "./NodeStore";
import { Constants } from "../Constants";

/**
 * This acts as a wrapper component for two arrays, one for unselected nodes and one for selected nodes
 */
export class NodeCollectionStore extends NodeStore {

    @observable
    public unselectedNodes: NodeStore[] = new Array<NodeStore>();

    @observable 
    public selectedNodes: NodeStore[] = new Array<NodeStore>();

    @observable
    public linkedNodes: NodeStore[][] = [];

    // Boolean that allows the text node to be editable
    @observable
    public editingText: boolean = false;

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)"; // for CSS trnsform property
    }

    // Checks if there are any selected nodes on the canvas
    @computed
    public get numOfSelectedNodes(): number {
        return this.selectedNodes.length;
    }

    // Adds a node to the unselected nodes array
    @action 
    public addNode(store: NodeStore): void {
        this.unselectedNodes.push(store);
    }
    // Makes the first two selected nodes linked
    @action
    public addLinkedNodes() {
        this.selectedNodes[Constants.FIRST_NODE_INDEX].linkedNode = true;
        this.selectedNodes[Constants.SECOND_NODE_INDEX].linkedNode = true;
        this.linkedNodes.push([this.selectedNodes[Constants.FIRST_NODE_INDEX], this.selectedNodes[Constants.SECOND_NODE_INDEX]]);
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
            selectedNode.linkedNode = false;
            this.unselectedNodes.splice(index, 1)})
        this.selectedNodes = new Array<NodeStore>();
    }
    // Unselects all the nodes visible on screen
    @action
    public unselectAllNodes(): void {
        this.selectedNodes.map(node => node.resizableNodeVisibility = ResizableNodesVisibility.Hidden)
        this.selectedNodes = new Array<NodeStore>();
    }

    // Swaps two nodes, severing their current links on the canvas
    @action
    public swapNodes(): void {
        if (this.selectedNodes.length !== 2) return;
        const firstNodeXPosition = this.selectedNodes[Constants.FIRST_NODE_INDEX].x;
        const firstNodeYPosition = this.selectedNodes[Constants.FIRST_NODE_INDEX].y;
        const secondNodeXPosition = this.selectedNodes[Constants.SECOND_NODE_INDEX].x;
        const secondNodeYPosition = this.selectedNodes[Constants.SECOND_NODE_INDEX].y;
        this.selectedNodes[Constants.FIRST_NODE_INDEX].x = secondNodeXPosition;
        this.selectedNodes[Constants.FIRST_NODE_INDEX].y = secondNodeYPosition;
        this.selectedNodes[Constants.SECOND_NODE_INDEX].x = firstNodeXPosition;
        this.selectedNodes[Constants.SECOND_NODE_INDEX].y = firstNodeYPosition;
        this.selectedNodes[Constants.FIRST_NODE_INDEX].linkedNode = false;
        this.selectedNodes[Constants.SECOND_NODE_INDEX].linkedNode = false;
    }
}