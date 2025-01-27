import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, StaticTextNodeStore } from "../../../stores";
import { Utils } from "../../../Utils";
import { CanvasType } from "../../../stores";
import "./TextNodeView.scss";
import "../NodeView.scss";
import { Editor } from 'primereact/editor';
import { ReactFlow } from "@xyflow/react";

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
            let canvastype = this.props.canvastype;
            if (canvastype === CanvasType.FreeformCanvas) {
                document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store))
                return (
                    <div>
                        {Utils.renderNode("node textNode", store, collection,
                <div>
                    <h3>{store.title}</h3>
                    <Editor value={store.text} onTextChange={(e) => {store.text = e.textValue as string}}/>
                </div>)}
                    </div>
                )
            }
            else {
                return (
                    <div>
                        {Utils.renderStaticNode("node textNode", store, collection,
                <div>
                    <h3>{store.title}</h3>
                    <Editor value={store.text} onTextChange={(e) => {store.text = e.textValue as string}}/>
                </div>)}
                    </div>
                )
            }
        }
}