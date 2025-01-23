import React from 'react';
import './App.scss';
import { NodeCollectionStore, NodeStore, StaticTextNodeStore, StoreType, VideoNodeStore } from './stores';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';
import { SideBar } from './views/sidebar/SideBar';
import { ImageNodeStore } from './stores/ImageNodeStore';
import { WebsiteNodeStore } from './stores/WebsiteNodeStore';


const mainNodeCollection = new NodeCollectionStore();

export class App extends React.Component {
    render() {
        return (
            <div className="App">
                <SideBar collection={mainNodeCollection}/>
              <FreeFormCanvas store={mainNodeCollection} /> 
            </div>
        );
    }
}

export default App;