import { observer } from "mobx-react";
import * as React from 'react';
import { CanvasType, NodeStore } from "../../../stores";
import { Utils } from "../../../Utils";
import "./TopBar.scss";

interface TopBarProps {
    store: NodeStore;
    canvasType: CanvasType;
}

// A class that is a wrapper component for the top bar of the node (allowing for it to move)
@observer
export class TopBar extends React.Component<TopBarProps> {

    moveNode = (e: React.PointerEvent, store: NodeStore, canvasType: CanvasType) => {
        if (canvasType === CanvasType.FreeformCanvas) {
                Utils.alterNode(e, store, "Move")
        }
    }
    render() {
        const store = this.props.store;
        const canvasType = this.props.canvasType;
        return (
        <div className="topbar" onPointerDown={(e) => 
            this.moveNode(e, store, canvasType)}/>
        )}
}