import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore } from "../../../stores";
import { Utils } from "../../../Utils";
import "./TopBar.scss";

interface TopBarProps {
    store: NodeStore;
}

@observer
export class TopBar extends React.Component<TopBarProps> {

    render() {
        const store = this.props.store;
        return <div className="topbar" onPointerDown={(e) => Utils.alterNode(e, store, "Move")}/>
    }
}