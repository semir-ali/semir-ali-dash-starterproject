import { observer } from "mobx-react";
import * as React from 'react';
import { WebsiteNodeStore } from "../../../stores/WebsiteNodeStore";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { NodeCollectionStore } from "../../../stores";

interface WebsiteNodeProps {
    store: WebsiteNodeStore;
    collection: NodeCollectionStore;
}

@observer
export class WebsiteNodeView extends React.Component<WebsiteNodeProps> {

    render() {
        let store = this.props.store;
        let collection = this.props.collection;
        return (
            <div className="node websiteNode" style={{ transform: store.transform, width: store.width}} onWheel={(e: React.WheelEvent) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                        onClick={() => this.onClickEvent(collection)}>
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <iframe src={store.url} />
                    </div>
                </div>
            </div>
        );
    }
    onClickEvent = (collection: NodeCollectionStore) => {
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