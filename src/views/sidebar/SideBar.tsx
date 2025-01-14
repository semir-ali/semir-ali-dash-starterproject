import { observer } from "mobx-react";
import * as React from 'react';
import "./SideBar.scss";

interface SideBarProps {
    
}

@observer
export class SideBar extends React.Component<SideBarProps> {
    render() {
        return (
            <div>
                <nav>
                    <ul className="sidebar">
                        <li><button>Test Button</button></li>
                        <li><button>Test Button #2</button></li>
                        <li><button>Test Button #3</button></li>
                    </ul>
                </nav>
            </div>
        )
    }
}