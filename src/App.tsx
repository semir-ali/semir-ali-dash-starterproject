import React from 'react';
import './App.scss';
import { Website } from './Website';
import ReactPlayer from 'react-player';
import { Constants } from './Constants';

export class App extends React.Component {
    render() {
        return (
            <div>
                <ReactPlayer 
                url={prompt("What music do you want played?", "https://www.youtube.com/watch?v=c977QdbTImU") as string} 
                    playing={true} 
                    controls={false} 
                    width="100%"
                    height={Constants.SONG_OFFSET}
                    volume={1} 
                />
            <Website />
            </div>
        )
    }
}

export default App;