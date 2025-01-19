import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore } from "../../../stores";
import "./TopBar.scss";

interface TopBarProps {
    store: NodeStore;
}

// A class that is a wrapper component for the top bar of the node (allowing for it to move)
@observer
export class TopBar extends React.Component<TopBarProps> {

    private isPointerDown = false;

    // When the mouse is pressed down, allows for the individual node to move
    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = true;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    // When the mouse is released, stops the movement of the nodes
    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    // Allows the node (and top bar) to move around
    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.isPointerDown) return;
        if (!this.props.store.selected){
            this.props.store.x += e.movementX;
            this.props.store.y += e.movementY;
        }
    }

    render() {
        return <div className="topbar" onPointerDown={this.onPointerDown}/>
    }
}
