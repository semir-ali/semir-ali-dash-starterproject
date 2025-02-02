import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, VideoNodeStore } from "../../../stores";
import { CanvasType } from "../../../stores";
import "./VideoNodeView.scss";
import "../NodeView.scss";
import { Utils } from "../../../Utils";

interface VideoNodeProps {
    store: VideoNodeStore;
    collection: NodeCollectionStore;
    canvastype: CanvasType;
}

// Visually represents the video node on the canvas
@observer
export class VideoNodeView extends React.Component<VideoNodeProps> {

    render() {
        let store = this.props.store;
        let collection = this.props.collection;
        let canvasType = this.props.canvastype;
        let nodeContent = <div>
                            <h3 className="title">{store.title}</h3>
                            <video src={store.url} controls/>
                        </div>
        if (canvasType === CanvasType.FreeformCanvas) {
            document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store, collection));
        }
        return (
            Utils.renderNode("node videoNode", canvasType, store, collection,
                nodeContent)
            )
        }
    }