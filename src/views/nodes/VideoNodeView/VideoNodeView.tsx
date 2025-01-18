import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, VideoNodeStore } from "../../../stores";
import { TopBar } from "./../TopBar";
import "./VideoNodeView.scss";
import { Utils } from "../../../Utils";

interface VideoNodeProps {
    store: VideoNodeStore;
    collection: NodeCollectionStore
}

@observer
export class VideoNodeView extends React.Component<VideoNodeProps> {

    render() {
        let store = this.props.store;
        let collection = this.props.collection;
        document.addEventListener("pointermove", (e) => Utils.onPointerMove(e, store))
        return (
            <div className="node videoNode" style={{ transform: store.transform, width: store.width, height: store.height, outline: store.outline, opacity: store.opacity}} onWheel={(e: React.WheelEvent) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                        onClick={() => Utils.onClickEvent(collection, store)}>
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <video src={store.url} controls />
                    </div>
                </div>
            </div>
        );
    }
}