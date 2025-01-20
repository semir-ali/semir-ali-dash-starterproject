import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore } from "../../../stores";
import { Utils } from "../../../Utils";
import "./TopBar.scss";

interface TopBarProps {
    store: NodeStore;
}

// A class that is a wrapper component for the top bar of the node (allowing for it to move)
@observer
export class TopBar extends React.Component<TopBarProps> {

    render() {
        const store = this.props.store;
        return <div className="topbar" onPointerDown={(e) => Utils.alterNode(e, store, "Move")}/>
    }
}