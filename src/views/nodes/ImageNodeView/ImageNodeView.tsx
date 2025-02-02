import { observer } from "mobx-react";
import * as React from 'react';
import { ImageNodeStore } from "../../../stores/ImageNodeStore";
import { NodeCollectionStore } from "../../../stores";
import { CanvasType } from "../../../stores";
import "./ImageNodeView.scss";
import "../NodeView.scss";
import { Utils } from "../../../Utils";

interface ImageNodeProps {
    store: ImageNodeStore;
    nodeCollection: NodeCollectionStore;
    canvastype: CanvasType
}

// Essentially represents the visual display of the image node on the canvas
@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {

    render() {
        let store = this.props.store;
        let nodeCollection = this.props.nodeCollection;
        let canvasType = this.props.canvastype;
        let nodeContent = <div>
                            <h3>{store.title}</h3>
                            <img src={store.url}/>
                            </div>
        if (canvasType === CanvasType.FreeformCanvas) {
            document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store, nodeCollection));
        }
        return (
            Utils.renderNode("node imageNode", canvasType, store, nodeCollection, 
                nodeContent)
        )
        }
    }