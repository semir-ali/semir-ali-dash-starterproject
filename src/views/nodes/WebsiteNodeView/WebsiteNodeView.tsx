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
    nodeCollection: NodeCollectionStore;
    canvastype: CanvasType;
}

// Visually shows the website node on the canvas
@observer
export class WebsiteNodeView extends React.Component<WebsiteNodeProps> {
    render() {
        let store = this.props.store;
        let nodeCollection = this.props.nodeCollection;
        let canvasType = this.props.canvastype;
        let nodeContent = <div>
                            <h3>{store.title}</h3>
                            <iframe src={store.url} />
                            <p>Not loading? Find your website at <a href={store.url}>{store.url}</a>
                            </p>
                        </div>
        if (canvasType === CanvasType.FreeformCanvas) {
            document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store, nodeCollection))
            }
        return (
            Utils.renderNode("node websiteNode", canvasType, store, nodeCollection,
                nodeContent)
            )
        }
    }