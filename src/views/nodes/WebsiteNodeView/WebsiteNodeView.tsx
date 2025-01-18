import { observer } from "mobx-react";
import * as React from 'react';
import { WebsiteNodeStore } from "../../../stores/WebsiteNodeStore";
import "./WebsiteNode.scss"
import { NodeCollectionStore } from "../../../stores";
import { Utils } from "../../../Utils";

interface WebsiteNodeProps {
    store: WebsiteNodeStore;
    collection: NodeCollectionStore;
}

@observer
export class WebsiteNodeView extends React.Component<WebsiteNodeProps> {

    render() {
        let store = this.props.store;
        let collection = this.props.collection;
        document.addEventListener("pointermove", (e) => Utils.onPointerMove(e, store))
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
}