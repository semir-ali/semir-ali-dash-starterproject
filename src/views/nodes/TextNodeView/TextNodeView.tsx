import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, StaticTextNodeStore } from "../../../stores";
import { NodeView } from "../../NodeView";
import { TopBar } from "../TopBar";
import "./TextNodeView.scss";

interface TextNodeProps {
    store: StaticTextNodeStore;
    collection: NodeCollectionStore;
}


@observer
export class TextNodeView extends NodeView<StaticTextNodeStore> {

    constructor(props: TextNodeProps) {
        super(props);
    }


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
}