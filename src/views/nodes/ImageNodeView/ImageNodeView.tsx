import { observer } from "mobx-react";
import * as React from 'react';
import { ImageNodeStore } from "../../../stores/ImageNodeStore";
import { NodeCollectionStore } from "../../../stores";
import { TopBar } from "./../TopBar";
import "./ImageNodeView.scss";
import { Utils } from "../../../Utils";

interface ImageNodeProps {
    store: ImageNodeStore;
    collection: NodeCollectionStore;
}

@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {

    render() {
        let store = this.props.store;
        let collection = this.props.collection;
        document.addEventListener("pointermove", (e) => Utils.onPointerMove(e, store))
        return (
            <div className="node imageNode" style={{ transform: store.transform, width: store.width, height: store.height, outline: store.outline, opacity: store.opacity}} onWheel={(e: React.WheelEvent) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                        onClick={() => Utils.onClickEvent(collection, store)}>
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