import { observer } from "mobx-react";
import * as React from 'react';
import { WebsiteNodeStore } from "../../../stores/WebsiteNodeStore";
import "./WebsiteNode.scss";
import "../NodeView.scss";
import { NodeCollectionStore } from "../../../stores";
import { CanvasType } from "../../../stores";
import { Utils } from "../../../Utils";

interface WebsiteNodeProps {
    store: WebsiteNodeStore;
    collection: NodeCollectionStore;
    canvastype: CanvasType;
}

// Visually shows the website node on the canvas
@observer
export class WebsiteNodeView extends React.Component<WebsiteNodeProps> {
    render() {
        let store = this.props.store;
        let collection = this.props.collection;
        let canvasType = this.props.canvastype;
        let nodeContent = <div>
                            <iframe src={store.url} />
                            <p>Not loading? Find your website at <a href={store.url}>{store.url}</a>
                            </p>
                        </div>
        if (canvasType === CanvasType.FreeformCanvas) {
            document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store, collection))
            }
        return (
            Utils.renderNode("node websiteNode", canvasType, store, collection,
                nodeContent)
            )
        }
    }