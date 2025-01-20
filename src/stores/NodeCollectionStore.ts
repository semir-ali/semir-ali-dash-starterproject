import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";
import { observer } from "mobx-react";
import * as React from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

/**
 * This acts as a wrapper component for two arrays, one for unselected nodes and one for selected nodes
 */
export class NodeCollectionStore extends NodeStore {

    @observable
    public unselectedNodes: NodeStore[] = new Array<NodeStore>();

    @observable 
    public selectedNodes: NodeStore[] = new Array<NodeStore>();

    @observable
    public linkedNodes: NodeStore[][] = [][2];

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)"; // for CSS trnsform property
    }

    @computed 
    public get linkedNodesIds(): string[] {
        return [this.selectedNodes[0].Id, this.selectedNodes[1].Id]
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