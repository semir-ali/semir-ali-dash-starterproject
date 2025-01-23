import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, StaticTextNodeStore, StoreType, VideoNodeStore } from "../../stores";
import { ImageNodeView } from "../nodes/ImageNodeView";
import { ImageNodeStore } from "../../stores/ImageNodeStore";
import { TextNodeView, VideoNodeView } from "../nodes";
import { WebsiteNodeView } from "../nodes/WebsiteNodeView";
import { SideBar } from "../sidebar/SideBar";
import { NodeLink } from "../NodeLink/NodeLink";
import "./FreeFormCanvas.scss";

interface FreeFormProps {
    store: NodeCollectionStore
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
        if (this.props.store.numOfSelectedNodes == 0) {
            this.props.store.x += e.movementX;
            this.props.store.y += e.movementY;
        }
    }
    
render() {
    let store = this.props.store;
    return (
        <div className="freeformcanvas-container" onPointerDown={this.onPointerDown}>
            <SideBar collection={this.props.store}/>
            <div className="freeformcanvas" style={{ transform: store.transform }}>
                <div>
                    {store.linkedNodes !== null ? 
                        store.linkedNodes.map(linkedNodes => (
                            <NodeLink 
                                key={`${linkedNodes[0].Id}-${linkedNodes[1].Id}`} 
                                node1={linkedNodes[0]}
                                node2={linkedNodes[1]} 
                                collection={store}
                            />
                        )) : null
                    }
                    {store.unselectedNodes.map(nodeStore => {
                        switch (nodeStore.type) {
                            case StoreType.Text:
                                return (<TextNodeView key={nodeStore.Id} store={nodeStore as StaticTextNodeStore} collection={store}/>);
                            case StoreType.Video:
                                return (<VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore} collection={store}/>);
                            case StoreType.Image:
                                return (<ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} collection={store}/>);
                            case StoreType.Website:
                                return (<WebsiteNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} collection={store}/>);
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