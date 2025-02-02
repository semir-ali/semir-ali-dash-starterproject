import { observer } from "mobx-react";
import * as React from 'react';
import { CanvasNodeStore, NodeCollectionStore } from "../../../stores";
import { NodeLink } from "../../NodeLink/NodeLink";
import { Utils } from "../../../Utils";
import "./FreeFormCanvas.scss";
import { Constants } from "../../../Constants";
import { CanvasType } from "../../../stores";

interface FreeFormProps {
    store: CanvasNodeStore // Treats the canvas as an individual node
    collection: NodeCollectionStore // Treats the canvas as a backdrop with multiple nodes
    previousCollection: NodeCollectionStore
    canvasType: CanvasType;
}

// Acts as the overall backdrop of the scene, being able to control the movement of the nodes
@observer
export class FreeFormCanvas extends React.Component<FreeFormProps> {
    
render() {
    let store = this.props.store;
    let collection = this.props.collection;
    let previousCollection = this.props.previousCollection;
    let canvasType = this.props.canvasType;
    let nodeContent = <div className="freeformcanvas" style={{ transform: collection.transform}}>
                        {previousCollection.linkedNodes !== null ? 
                        collection.linkedNodes.map(linkedNodes => (
                        <NodeLink 
                            key={Utils.GenerateGuid()} 
                            node1={linkedNodes[Constants.FIRST_NODE_INDEX]}
                            node2={linkedNodes[Constants.SECOND_NODE_INDEX]} 
                            nodeCollection={collection}
                        />
                        )) : null
                    }
                    {Utils.renderCanvas(collection, "none", store.canvasType as CanvasType)}
                    </div>
    if (store.isRenderedNode === false) {
        // When Freeform is not rendered (acts as a node), adds it to the canvas and makes it moveable on the the freeform canvas
        if (canvasType === CanvasType.FreeformCanvas) {
            document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store, previousCollection));
        }
        return (
            Utils.renderNode("node freeformcanvasNode", canvasType, store, previousCollection, 
                nodeContent)
        );
    }
    // Else, makes the freeform canvas, with nodes that are able to be moved through dragging
    return (
        <div className="freeformcanvas-container" style={{ filter: `brightness(${store.mode})`}} onPointerDown={e => 
        {if (collection.selectedNodes.length === 0) {
            Utils.alterNode(e, collection, "Move")
        }}}>
            <div className="freeformcanvas" style={{ transform: collection.transform}}>
                <div>
                    {collection.linkedNodes !== null ? 
                        collection.linkedNodes.map(linkedNodes => (
                            <NodeLink 
                                key={Utils.GenerateGuid()} 
                                node1={linkedNodes[Constants.FIRST_NODE_INDEX]}
                                node2={linkedNodes[Constants.SECOND_NODE_INDEX]} 
                                nodeCollection={collection}
                            />
                        )) : null}
                    {Utils.renderCanvas(collection, Constants.NO_CLASS_NAME, store.canvasType as CanvasType)}
                </div>
            </div>
        </div>
    );
}
}