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
    collection: NodeCollectionStore;
    canvastype: CanvasType
}

// Essentially represents the visual display of the image node
@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {

    render() {
        let store = this.props.store;
        let collection = this.props.collection;
        let canvastype = this.props.canvastype;
        if (canvastype === CanvasType.FreeformCanvas) {
            document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store))
            return (
                <div>
                    {Utils.renderNode("node imageNode", store, collection,
                    <div>
                                    <img src={store.url} />
                                </div>)}
                </div>
            )
        }
        else {
            return (
                Utils.renderStaticNode("node imageNode", store, collection,
                    <div>
                                    <img src={store.url} />
                                </div>)
            )
        }
    }
}