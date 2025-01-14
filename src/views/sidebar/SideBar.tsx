import { observer } from "mobx-react";
import * as React from 'react';
import "./SideBar.scss";

interface SideBarProps {
    
}

@observer
export class SideBar extends React.Component<SideBarProps> {
    render() {
        return (
            <nav className="nav">
                <a href='/'>Brown Dash
                <ul>
                    <li><button>Add Text Node</button></li>
                    <li><button>Add Website Node</button></li>
                    <li><button>Add Video Node</button></li>
                    <li><button>Add Image Node</button></li>
                    <li><button>Remove Node</button></li>
                </ul>
                </a>
            </nav>
        )
    }
}