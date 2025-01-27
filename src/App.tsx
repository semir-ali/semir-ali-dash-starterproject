import React from 'react';
import './App.scss';
import { CanvasCollectionStore } from './stores';
import { Website } from './Website';
import { observer } from 'mobx-react';
import { GridCanvas } from './views/nodes/GridCanvas/GridCanvas';


export class App extends React.Component {
    render() {
        return (
            <Website />
        )
    }
}

export default App;