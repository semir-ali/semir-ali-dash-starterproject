import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, StaticTextNodeStore } from "../../../stores";
import { Utils } from "../../../Utils";
import { CanvasType } from "../../../stores";
import "./TextNodeView.scss";
import "../NodeView.scss";
import { Editor } from 'primereact/editor';

interface TextNodeProps {
    store: StaticTextNodeStore;
    collection: NodeCollectionStore;
    canvastype: CanvasType;
}
// Essentially acts as the visual display for the text node
@observer
export class TextNodeView extends React.Component<TextNodeProps> {
    render() {
            let store = this.props.store;
            let collection = this.props.collection;
            let canvasType = this.props.canvastype;
            let nodeContent = <div>
                                <h3>{store.title}</h3>
                                <Editor value={store.text} onTextChange={(e) => {
                                store.text = e.textValue as string}}/>
                            </div>
            if (canvasType === CanvasType.FreeformCanvas) {
                document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store, collection))
            }
            return (
                Utils.renderNode("node textNode", store, collection,
                    nodeContent))
        }
    }