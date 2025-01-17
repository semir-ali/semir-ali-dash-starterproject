import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";

export class NodeCollectionStore extends NodeStore {

    @observable
    public nodes: NodeStore[] = new Array<NodeStore>();

    @observable 
    public selectedNodes: NodeStore[] = new Array<NodeStore>();

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)"; // for CSS trnsform property
    }
    @computed
    public get hasSelectedNodes(): boolean {
        if (this.selectedNodes.length > 0) {
            return true;
        }
        return false;
    }

    @action
    public addNodes(stores: NodeStore[]): void {
        this.nodes.push(...stores); // This is equivalent to: stores.forEach(store => this.nodes.push(store));
    }
    @action 
    public addNode(store: NodeStore): void {
        this.nodes.push(store);
    }
    @action
    public addSelectedNodes(store: NodeStore): void {
        this.selectedNodes.push(store)
    }
    @action
    public removeSelectedNode(store: NodeStore): void {
        const index = this.selectedNodes.indexOf(store)
        this.selectedNodes.splice(index, 1)
    }
    @action 
    public removeSelectedNodes(): void {
        console.log(this.selectedNodes)
        this.selectedNodes.forEach((selectedNode) =>
            {const index = this.nodes.indexOf(selectedNode)
            this.nodes.splice(index, 1)})
        this.selectedNodes = new Array<NodeStore>();
    }
}