import React from 'react';
import './App.scss';
import { NodeCollectionStore, NodeStore, StaticTextNodeStore, StoreType, VideoNodeStore } from './stores';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';
import { ImageNodeStore } from './stores/ImageNodeStore';
import { WebsiteNodeStore } from './stores/WebsiteNodeStore';
import { SideBar } from './views/sidebar/SideBar';


const mainNodeCollection = new NodeCollectionStore();

export class App extends React.Component {
    render() {
        console.log('Hi!')
        return (
            <div className="App">
              <FreeFormCanvas store={mainNodeCollection} /> 
            </div>
        );
    }
}

export default App;