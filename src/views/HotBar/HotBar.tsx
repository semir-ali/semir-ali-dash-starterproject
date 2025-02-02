import { observer } from "mobx-react";
import * as React from 'react';
import { CanvasCollectionStore, CanvasNodeStore, NodeCollectionStore, StaticTextNodeStore, StoreType, VideoNodeStore } from "../../stores";
import { ImageNodeStore } from "../../stores/ImageNodeStore";
import { WebsiteNodeStore } from "../../stores/WebsiteNodeStore";
import { NodeStore } from "../../stores";
import { NodeLink } from "../NodeLink/NodeLink";
import { NodePosition } from "../../stores";
import { CanvasType } from "../../stores";
import "./HotBar.scss";
import { Constants } from "../../Constants";

interface HotBarProps {
    currentCanvas: CanvasNodeStore;
    canvasCollection: CanvasCollectionStore;
}

// A wrapper class for a top hotbar which allows for user interaction with the nodes on the canvas
@observer
export class HotBar extends React.Component<HotBarProps> {
    render() {
        let canvasCollection = this.props.canvasCollection;
        let nodeCollection = this.props.currentCanvas.childrenNodes;
        let currentCanvas = this.props.currentCanvas;
        // Makes a navigation bar which individually adds nodes to the scene based on individual types, also prompts user for relevant information (i.e. the title, url, text)
        return (
            <nav className="nav">
                <ul>
                    <li><button onClick={() => this.addNode(nodeCollection, new StaticTextNodeStore({type: StoreType.Text, title: prompt('Title? ', "untitled") as string, text: prompt('Text? ', Constants.DEFAULT_TEXT) as string}))}>Add Text Node</button></li>
                    <li><button onClick={() => this.addNode(nodeCollection, new WebsiteNodeStore({type: StoreType.Website, url: prompt('Which website do you want displayed? ', Constants.DEFAULT_WEBSITE) as string}))}>Add Website Node</button></li>
                    <li><button onClick={() => this.addNode(nodeCollection, new VideoNodeStore({type: StoreType.Video, url: prompt('What is the url of your video? ', Constants.DEFAULT_VIDEO) as string}))}>
                        Add Video Node</button></li>
                    <li><button onClick={() => this.addNode(nodeCollection, 
                        new ImageNodeStore({type: StoreType.Image, url: prompt('What is the url of your image? ', Constants.DEFAULT_IMAGE) as string}))}>Add Image Node</button></li>
                    <li><button onClick={() => this.addCanvasNode(canvasCollection, currentCanvas, nodeCollection, CanvasType.FreeformCanvas, StoreType.FreeformCanvas)}>Add Freeform Canvas Node</button></li>
                    <li><button onClick={() => this.addCanvasNode(canvasCollection, currentCanvas, nodeCollection, CanvasType.Grid, StoreType.Grid)}>Add Grid Canvas Node</button></li>
                    <li><button onClick={() => this.removeNode(nodeCollection)}>Remove Node</button></li>
                    <li><button onClick={() => this.linkNodes(nodeCollection)}>Link Nodes</button></li>
                    <li><button onClick={() => this.unselectNodes(nodeCollection)}>Unselect Nodes</button></li>
                    <li><button onClick={() => this.enterCanvas(canvasCollection, currentCanvas)}>Enter Canvas</button></li>
                    <li><button onClick={() => this.exitCanvas(currentCanvas)}>Exit Canvas</button></li>
                    <li><button onClick={() => nodeCollection.swapNodes()}>Swap Nodes</button></li>
                    <li><button onClick={() => currentCanvas.switchModes()}>Change Modes</button></li>
                    <li><button onClick={() => canvasCollection.resetCanvas()}>Reset Canvas</button></li>

                </ul>
            </nav>
        )
    }
    //Unselects nodes
    unselectNodes = (nodeCollection: NodeCollectionStore): void => {
        nodeCollection.unselectAllNodes();
    }
    // Takes a node and adds it to the node collection (so it can be removed)
    addNode = (nodeCollection: NodeCollectionStore, store: NodeStore): void => {
        nodeCollection.addNode(store);
    }

    // Removes all selected nodes from the screen
    removeNode = (nodeCollection: NodeCollectionStore): void => {
        nodeCollection.removeSelectedNodes();
    }

    // Links two nodes together
    linkNodes = (nodeCollection: NodeCollectionStore): void => {
        if (nodeCollection.numOfSelectedNodes === 2) {
            nodeCollection.addLinkedNodes()
            new NodeLink({node1: nodeCollection.selectedNodes[Constants.FIRST_NODE_INDEX], node2: nodeCollection.selectedNodes[Constants.SECOND_NODE_INDEX], nodeCollection: nodeCollection})
        }
    }
    // Specifically adds a canvas to the current canvas
    addCanvasNode = (canvasCollection: CanvasCollectionStore, currentCanvas: CanvasNodeStore, nodeCollection: NodeCollectionStore, canvasType: CanvasType, storeType: StoreType): void => {
        var canvasStore = new CanvasNodeStore({type: storeType, canvasType: canvasType, prevNode: currentCanvas, childrenNodes: new NodeCollectionStore()});
        this.addNode(nodeCollection, canvasStore);
        canvasCollection.addCanvas(canvasStore)
    }

    enterCanvas = (canvas: CanvasCollectionStore, currentCanvas: CanvasNodeStore): void => {
    let selectedCanvas: CanvasNodeStore | null = null;

    // Identify the currently selected canvas
    for (let i = 0; i < canvas.canvasCollection.length; i++) {
        if (canvas.canvasCollection[i].position === NodePosition.Selected && canvas.canvasCollection[i] !== currentCanvas) {
            selectedCanvas = canvas.canvasCollection[i];
            break; // Stop once the selected canvas is found
        }
    }

    if (!selectedCanvas) return;

    // Deactivate the currently rendered canvas
    for (let i = 0; i < canvas.canvasCollection.length; i++) {
        if (canvas.canvasCollection[i].isRenderedNode) {
            canvas.canvasCollection[i].isRenderedNode = false;
            break; // Stop after deactivating the rendered canvas
        }
    }

    // Activate the selected canvas
    selectedCanvas.isRenderedNode = true;
    };

    // Exits the canvas
    exitCanvas = (currentCanvas: CanvasNodeStore) => {
        var newRenderedCanvas = currentCanvas.prevNode;
        if (newRenderedCanvas !== undefined) {
            currentCanvas.isRenderedNode = false;
            newRenderedCanvas.isRenderedNode = true;
        }
    }
}