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

// Visually shows the website node
@observer
export class WebsiteNodeView extends React.Component<WebsiteNodeProps> {

    render() {
        let store = this.props.store;
        let collection = this.props.collection;
        let canvastype = this.props.canvastype;
        if (canvastype === CanvasType.FreeformCanvas) {
            console.log("Rep!")
            document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store))
            return (
                <div>
                    {Utils.renderNode("node websiteNode", store, collection,
                    <div>
                        <iframe src={store.url} />
                            <p>Not loading? Find your website at <a href={store.url}>{store.url}</a>
                            </p>
                    </div>)}
                </div>
            )
        }
        else {
            console.log("Rep!")
            return (
                Utils.renderStaticNode("node websiteNode", store, collection,
                    <div>
                        <iframe src={store.url} />
                            <p>Not loading? Find your website at <a href={store.url}>{store.url}</a>
                            </p>
                    </div>)
            )
        }
    }
}