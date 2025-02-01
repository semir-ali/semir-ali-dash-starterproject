import { observer } from "mobx-react";
import * as React from 'react';
import { CanvasNodeStore, NodeCollectionStore } from "../../../stores";
import { NodeLink } from "../../NodeLink/NodeLink";
import { Utils } from "../../../Utils";
import "./FreeFormCanvas.scss";
import { Constants } from "../../../Constants";

interface FreeFormProps {
    store: CanvasNodeStore // Treats the canvas as an individual node
    collection: NodeCollectionStore // Treats the canvas as a backdrop with multiple nodes
    previousCollection: NodeCollectionStore
}

// Acts as the overall backdrop of the scene, being able to control the movement of the nodes
@observer
export class FreeFormCanvas extends React.Component<FreeFormProps> {
    
// We're going to do this later, but you know the fix
// If the node is grid, make it static, if not make it moveable :grin:
render() {
    let store = this.props.store;
    let collection = this.props.collection;
    let previousCollection = this.props.previousCollection;
    let nodeContent = <div className="freeformcanvas" style={{ transform: previousCollection.transform }}>
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
                    {Utils.renderCanvas(collection, "none")}
                </div>
    document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store, collection));
    if (store.isRenderedNode === false) {
        return (
            Utils.renderNode("node freeformcanvasNode", store, previousCollection, 
                nodeContent)
        );
    }
    return (
        <div className="freeformcanvas-container" onPointerDown={e => 
        {if (collection.selectedNodes.length === 0) {
            Utils.alterNode(e, collection, "Move")
        }}}>
            <div className="freeformcanvas" style={{ transform: collection.transform }}>
                <div>
                    {collection.linkedNodes !== null ? 
                        collection.linkedNodes.map(linkedNodes => (
                            <NodeLink 
                                key={Utils.GenerateGuid()} 
                                node1={linkedNodes[0]}
                                node2={linkedNodes[1]} 
                                nodeCollection={collection}
                            />
                        )) : null
                    }
                    {Utils.renderCanvas(collection, "none")}
                </div>
            </div>
        </div>
    );
}
}