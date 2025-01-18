import { observer } from "mobx-react";
import * as React from 'react';
import { WebsiteNodeStore } from "../../../stores/WebsiteNodeStore";
import "./WebsiteNode.scss"
import { TopBar } from "./../TopBar";
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
            <div className="node websiteNode" style={{ transform: store.transform, width: store.width, height: store.height, outline:store.outline, opacity: store.opacity}} onWheel={(e: React.WheelEvent) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                        onClick={() => Utils.onClickEvent(collection, store)}>
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <iframe src={store.url} />
                        <p>Not loading? Find your website at <a href={store.url}>{store.url}</a></p>
                    </div>
                </div>
            </div>
        );
    }
}