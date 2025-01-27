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

// Visually represents the video node
@observer
export class VideoNodeView extends React.Component<VideoNodeProps> {

    render() {
        let store = this.props.store;
        let collection = this.props.collection;
        let canvastype = this.props.canvastype;
        if (canvastype === CanvasType.FreeformCanvas) {
            document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store))
            return (
                <div>
                    {Utils.renderNode("node videoNode", store, collection,
                    <div>
                    <h3 className="title">{store.title}</h3>
                    <video src={store.url} controls/>
                </div>)}
                </div>
            )
        }
        else {
            return (
                Utils.renderStaticNode("node videoNode", store, collection,
                    <div>
                    <h3 className="title">{store.title}</h3>
                    <video src={store.url} controls />
                </div>)
            )
        }
    }
}