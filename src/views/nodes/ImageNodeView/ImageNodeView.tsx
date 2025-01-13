import { observer } from "mobx-react";
import * as React from 'react';
import { ImageNodeStore } from "../../../stores/ImageNodeStore";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./ImageNodeView.scss";

interface ImageNodeProps {
    store: ImageNodeStore;
}

@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {

    render() {
        let store = this.props.store;
        return (
            <div className="node imageNode" style={{ transform: store.transform, width: store.width}} onWheel={(e: React.WheelEvent) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}>
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <img src={store.url} />
                    </div>
                </div>
            </div>
        );
    }
}