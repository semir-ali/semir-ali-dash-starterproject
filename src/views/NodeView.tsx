import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, StaticTextNodeStore } from "../stores";
import { NodeStore } from "../stores";
import { TopBar } from "./nodes";
import "./NodeView.scss";

interface NodeProps {
    store: StaticTextNodeStore;
    collection: NodeCollectionStore;
}

@observer
export abstract class NodeView<NodeStore> extends React.Component<NodeProps> {

    render() {
        const collection = this.props.collection;
        const store = this.props.store;
        if (!store.placed) {
            document.addEventListener("pointermove", this.onPointerMove)
        }
        return (
            <div
                className="node textNode"
                style={{
                    transform: store.transform,
                    width: store.width,
                    border: store.border,
                    outline: store.outline,
                    height: store.height,
                    opacity: store.opacity
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
                        <h3 className="title">{store.title}</h3>
                        <p className="paragraph">{store.text}</p>
                    </div>
                </div>
            </div>
        );
    }

    protected onClickEvent = (collection: NodeCollectionStore) => {
        if (!this.props.store.placed) {
            this.props.store.placed = true;
            this.props.store.opacity = 1;
            document.removeEventListener("pointermove", this.onPointerMove);
        }
        if (!this.props.store.selected) {
            this.props.store.outline = "10px blue solid";
            collection.addSelectedNodes(this.props.store);

            document.addEventListener("keydown", this.onKeyDown);
        } else {
            this.props.store.outline = "transparent";
            collection.removeSelectedNode(this.props.store);

            document.removeEventListener("keydown", this.onKeyDown);
        }

        this.props.store.selected = !this.props.store.selected;
    };
    protected onPointerMove = (e: PointerEvent) => {
        this.props.store.x = e.x - this.props.store.width / 2;
        this.props.store.y = e.y - this.props.store.width / 2;
    }
    protected onPointerDown = (e: PointerEvent) => {
        this.props.store.placed = true;
        document.removeEventListener("pointermove", this.onPointerMove);
    }

    protected onKeyDown = (e: KeyboardEvent): void => {
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