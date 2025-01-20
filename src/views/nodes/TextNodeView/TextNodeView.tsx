import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, StaticTextNodeStore } from "../../../stores";
import { Utils } from "../../../Utils";
import "./TextNodeView.scss";

interface TextNodeProps {
    store: StaticTextNodeStore;
    collection: NodeCollectionStore;
}

// Essentially acts as the visual display for the text node
@observer
export class TextNodeView extends React.Component<TextNodeProps> {
    render() {
        const store = this.props.store;
        const collection = this.props.collection;
        document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store))
        return (
            <div>
                {Utils.renderNode("node textNode", store, collection,
                <div>
                    <h3 className="title">{store.title}</h3>
                    <p className="paragraph">{store.text}</p>
                </div>)}
            </div>
        );
    }
}