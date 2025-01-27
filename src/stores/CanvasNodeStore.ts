import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";
import { observer } from "mobx-react";
import * as React from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { NodeCollectionStore } from "./NodeCollectionStore";
import { CanvasCollectionStore } from "./CanvasCollectionStore";

export enum CanvasType {
    FreeformCanvas,
    Grid
}
/**
 * This acts as a wrapper component for two arrays, one for unselected nodes and one for selected nodes
 */
export class CanvasNodeStore extends NodeStore {
    constructor(initializer: Partial<CanvasNodeStore>) {
        /**
         An object of type Partial<StaticTextNodeStore> means that the object passed into it will have the properties of a StaticTextNodeStore (title and text, below), as well as the properties of a NodeStore, which it inherits from. 
         Additionally, the Partial<> bit makes all these properties optional, so the object passed in may not have all these properties.
         */
        super();
        Object.assign(this, initializer);

        /*
        the line above is equivalent to:

        this.x = initializer.x;
        this.y = initializer.y;
        this.title = initializer.title;
        this.text = initializer.text;
        */
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
}