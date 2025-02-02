import { observer } from "mobx-react";
import * as React from 'react';
import { CanvasNodeStore, NodeCollectionStore } from "../../../stores";
import { CanvasType } from "../../../stores";
import { NodeLink } from "../../NodeLink/NodeLink";
import { Utils } from "../../../Utils";
import { Constants } from "../../../Constants";
import "./GridCanvas.scss";

interface GridProps {
    store: CanvasNodeStore // Treats the canvas as an individual node
    nodeCollection: NodeCollectionStore // Treats the canvas as a backdrop with multiple nodes
    previousCollection: NodeCollectionStore;
    canvasType: CanvasType;
}

// Acts as the overall backdrop of the scene, being able to control the movement of the nodes
@observer
export class GridCanvas extends React.Component<GridProps> {
    render() {
        let store = this.props.store;
        let nodeCollection = this.props.nodeCollection;
        let previousCollection = this.props.previousCollection;
        let canvasType = this.props.canvasType;
        var nodeContent = <div className="grid">
                    <h3>{store.title}</h3>
                    {previousCollection.linkedNodes !== null ? 
                        nodeCollection.linkedNodes.map(linkedNodes => (
                            <NodeLink 
                            key={Utils.GenerateGuid()} 
                            node1={linkedNodes[Constants.FIRST_NODE_INDEX]}
                            node2={linkedNodes[Constants.SECOND_NODE_INDEX]} 
                            nodeCollection={nodeCollection}/>
                        )) : null}
                        {Utils.renderCanvas(nodeCollection, "box", store.canvasType as CanvasType)}
                        </div>
        if (store.isRenderedNode === false) {
            if (canvasType === CanvasType.FreeformCanvas) {
                document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store, previousCollection));
            }
            return (
                Utils.renderNode("node gridNode", canvasType, store, previousCollection, nodeContent)
                );
        }
        return (
            <div className="container" style={{filter: `brightness(${store.mode})`}}>
            {Utils.renderCanvas(nodeCollection, "box", store.canvasType as CanvasType)}
            </div>)
        }
    }