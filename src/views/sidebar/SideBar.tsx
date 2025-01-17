import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, StaticTextNodeStore, StoreType, VideoNodeStore } from "../../stores";
import { ImageNodeView } from "../nodes/ImageNodeView";
import { ImageNodeStore } from "../../stores/ImageNodeStore";
import { TextNodeView, VideoNodeView } from "../nodes";
import { WebsiteNodeView } from "../nodes/WebsiteNodeView";
import { WebsiteNodeStore } from "../../stores/WebsiteNodeStore";
import { NodeStore } from "../../stores";
import "./SideBar.scss";

interface SideBarProps {
    store: NodeCollectionStore;
}

@observer
export class SideBar extends React.Component<SideBarProps> {
    render() {
        let store = this.props.store;
        // Makes a navigation bar which individually adds nodes to the scene
        return (
            <nav className="nav">
                <ul>
                    <li><button onClick={() => this.addNode(store, new StaticTextNodeStore({type: StoreType.Text, x: Math.random() * 300, y: Math.random() * 300}))}>Add Text Node</button></li>
                    <li><button onClick={() => this.addNode(store, new WebsiteNodeStore({type: StoreType.Website, x: Math.random() * 300, y: Math.random() * 300, url: "https://www.wikipedia.com"}))}>Add Website Node</button></li>
                    <li><button onClick={() => this.addNode(store, new VideoNodeStore({type: StoreType.Video, x: Math.random() * 300, y: Math.random() * 300, url: "https://img.pokemondb.net/artwork/large/muk.jpg"}))}>
                        Add Video Node</button></li>
                    <li><button onClick={() => this.addNode(store, 
                        new ImageNodeStore({type: StoreType.Image, x: Math.random() * 300, y: Math.random() * 300, url: "https://img.pokemondb.net/artwork/large/muk.jpg"}))}>Add Image Node</button></li>
                    <li><button onClick={() => this.removeNode(store)}>Remove Node</button></li>
                </ul>
            </nav>
        )
    }
    // Takes a node and adds it to the node collection (so it can be removed)
    addNode = (store: NodeCollectionStore, node: NodeStore): void => {
        store.addNode(node);
    }

    removeNode = (store: NodeCollectionStore): void => {
        store.removeSelectedNodes();
    }
}