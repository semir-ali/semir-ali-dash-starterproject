import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, StaticTextNodeStore, StoreType, VideoNodeStore } from "../../stores";
import { ImageNodeView } from "../nodes/ImageNodeView";
import { ImageNodeStore } from "../../stores/ImageNodeStore";
import { TextNodeView, VideoNodeView } from "../nodes";
import { WebsiteNodeView } from "../nodes/WebsiteNodeView";
import { SideBar } from "../sidebar/SideBar";
import "./FreeFormCanvas.scss";

interface FreeFormProps {
    store: NodeCollectionStore
}

@observer
export class FreeFormCanvas extends React.Component<FreeFormProps> {

    private isPointerDown: boolean | undefined;

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = true;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.isPointerDown) return;
        if (!this.props.store.hasSelectedNodes) {
            this.props.store.x += e.movementX;
            this.props.store.y += e.movementY;
        }
    }
    xLocation = (): number => this.props.store.x;
    render() {
        let store = this.props.store;
        return (
            <div className="freeformcanvas-container" onPointerDown={this.onPointerDown}>
                <SideBar store={this.props.store}></SideBar>
                <div className="freeformcanvas" style={{ transform: store.transform }}>             
                </div>
            </div>
        );
    }
}