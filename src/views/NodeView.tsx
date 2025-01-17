import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore } from "../stores";
import { NodeStore } from "../stores";
import { TopBar } from "./nodes";
import "./../NodeView.scss";
import "./TextNodeView.scss";

interface NodeProps {
    store: NodeStore;
    collection: NodeCollectionStore;
}

@observer
export class NodeView extends React.Component<NodeProps> {

    render() {
        const store = this.props.store;
        const collection = this.props.collection;
        return (
            <div
                className="node"
                style={{
                    transform: store.transform,
                    width: store.width,
                    border: store.border,
                    outline: store.outline,
                    height: store.height
                }}
                onWheel={(e: React.WheelEvent) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                onClick={() => this.onClickEvent(collection)}
            >
                <TopBar store={store} />
                <div className="scroll-box">
                    <div className="content">
                    </div>
                </div>
            </div>
        );
    }

    onClickEvent = (collection: NodeCollectionStore) => {
        if (!this.props.store.selected) {
            this.props.store.outline = "10px blue solid";
            collection.addSelectedNodes(this.props.store);

            // Add event listeners for arrow keys when the node is selected
            document.addEventListener("keydown", this.onKeyDown);
        } else {
            this.props.store.outline = "transparent";
            collection.removeSelectedNode(this.props.store);

            // Remove event listeners for arrow keys when the node is deselected
            document.removeEventListener("keydown", this.onKeyDown);
        }

        // Toggle selection state
        this.props.store.selected = !this.props.store.selected;
    };

    onKeyDown = (e: KeyboardEvent): void => {
        e.stopPropagation();
        e.preventDefault();

        // Only apply changes if the node is selected
        if (this.props.store.selected) {
            switch (e.key) {
                case "ArrowRight":
                    // Increase width when pressing the right arrow
                    this.props.store.width += 1;
                    break;
                case "ArrowLeft":
                    // Decrease width when pressing the left arrow
                    this.props.store.width -= 1;
                    break;
                case "ArrowUp":
                    // Decrease height when pressing the up arrow
                    this.props.store.height -= 1;
                    break;
                case "ArrowDown":
                    // Increase height when pressing the down arrow
                    this.props.store.height += 1;
                    break;
                default:
                    break;
            }
        }
    };
}