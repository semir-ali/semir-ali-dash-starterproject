import { observer } from "mobx-react";
import * as React from 'react';
import { CanvasNodeStore, NodeCollectionStore, StaticTextNodeStore, StoreType, VideoNodeStore } from "../../../stores";
import { ImageNodeView } from "../ImageNodeView";
import { ImageNodeStore } from "../../../stores/ImageNodeStore";
import { TextNodeView, VideoNodeView } from "..";
import { WebsiteNodeView } from "../WebsiteNodeView";
import { SideBar } from "../../sidebar/SideBar";
import { NodeLink } from "../../NodeLink/NodeLink";
import "./FreeFormCanvas.scss";

interface FreeFormProps {
    store: CanvasNodeStore
    collection: NodeCollectionStore
}

// Acts as the overall backdrop of the scene, being able to control the movement of the nodes
@observer
export class FreeFormCanvas extends React.Component<FreeFormProps> {

    private isPointerDown: boolean | undefined;

    // When the mouse is pressed down, allows for the movement of the nodes
    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = true;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    // When the mouse is released, stops this movement
    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    // If there are no selected nodes on screen, moves all the nodes
    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.isPointerDown) return;
        if (this.props.collection.numOfSelectedNodes == 0) {
            this.props.collection.x += e.movementX;
            this.props.collection.y += e.movementY;
        }
    }
    
render() {
    let collection = this.props.collection;
    let store = this.props.store;
    if (store.isRenderedNode === false) {
        
    }
    return (
        <div className="freeformcanvas-container" onPointerDown={this.onPointerDown}>
            <SideBar collection={this.props.collection}/>
            <div className="freeformcanvas" style={{ transform: collection.transform }}>
                <div>
                    {collection.linkedNodes !== null ? 
                        collection.linkedNodes.map(linkedNodes => (
                            <NodeLink 
                                key={`${linkedNodes[0].Id}-${linkedNodes[1].Id}`} 
                                node1={linkedNodes[0]}
                                node2={linkedNodes[1]} 
                                collection={collection}
                            />
                        )) : null
                    }
                    {collection.unselectedNodes.map(nodeStore => {
                        switch (nodeStore.type) {
                            case StoreType.Text:
                                return (<TextNodeView key={nodeStore.Id} store={nodeStore as StaticTextNodeStore} collection={collection}/>);
                            case StoreType.Video:
                                return (<VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore} collection={collection}/>);
                            case StoreType.Image:
                                return (<ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} collection={collection}/>);
                            case StoreType.Website:
                                return (<WebsiteNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} collection={collection}/>);
                            case StoreType.FreeformCanvas:
                                return (<FreeFormCanvas key={nodeStore.Id} store={nodeStore as CanvasNodeStore} collection={collection}/>);
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
}
}