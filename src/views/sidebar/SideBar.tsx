import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, StaticTextNodeStore, StoreType, VideoNodeStore } from "../../stores";
import { ImageNodeStore } from "../../stores/ImageNodeStore";
import { WebsiteNodeStore } from "../../stores/WebsiteNodeStore";
import { NodeStore } from "../../stores";
import "./SideBar.scss";

interface SideBarProps {
    store: NodeCollectionStore;
}

// A wrapper class for a top hotbar which allows for user interaction with the nodes on the canvas
@observer
export class SideBar extends React.Component<SideBarProps> {
    render() {
        let store = this.props.store;
        // Makes a navigation bar which individually adds nodes to the scene based on individual types, also prompts user for relevant information (i.e. the title, url, text)
        return (
            <nav className="nav">
                <ul>
                    <li><button onClick={() => this.addNode(store, new StaticTextNodeStore({type: StoreType.Text, title: prompt('Title? ', "untitled") as string, text: prompt('Text? ', "untitled") as string}))}>Add Text Node</button></li>
                    <li><button onClick={() => this.addNode(store, new WebsiteNodeStore({type: StoreType.Website, url: prompt('Which website do you want displayed? ', 'https://www.google.com') as string}))}>Add Website Node</button></li>
                    <li><button onClick={() => this.addNode(store, new VideoNodeStore({type: StoreType.Video, url: prompt('What is the url of your video? ', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4') as string}))}>
                        Add Video Node</button></li>
                    <li><button onClick={() => this.addNode(store, 
                        new ImageNodeStore({type: StoreType.Image, url: prompt('What is the url of your image? ', "https://img.pokemondb.net/artwork/large/muk.jpg") as string}))}>Add Image Node</button></li>
                    <li><button onClick={() => this.removeNode(store)}>Remove Node</button></li>
                </ul>
            </nav>
        )
    }
    // Takes a node and adds it to the node collection (so it can be removed)
    addNode = (store: NodeCollectionStore, node: NodeStore): void => {
        store.addNode(node);
    }

    // Removes all selected nodes from the screen
    removeNode = (store: NodeCollectionStore): void => {
        store.removeSelectedNodes();
    }
}