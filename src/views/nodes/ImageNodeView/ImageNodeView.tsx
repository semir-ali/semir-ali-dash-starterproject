import { observer } from "mobx-react";
import * as React from 'react';
import { ImageNodeStore } from "../../../stores/ImageNodeStore";
import { NodeCollectionStore } from "../../../stores";
import "./ImageNodeView.scss";
import { Utils } from "../../../Utils";

interface ImageNodeProps {
    store: ImageNodeStore;
    collection: NodeCollectionStore;
}

// Essentially represents the visual display of the image node
@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {

    render() {
        let store = this.props.store;
        let collection = this.props.collection;
        document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store))
        return (
            <div>
                {Utils.renderNode("node imageNode", store, collection,
                                <div>
                                    <img src={store.url} />
                                </div>)}
            </div>
        );
    }
}