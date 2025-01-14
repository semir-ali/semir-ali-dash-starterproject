import { observer } from "mobx-react";
import * as React from 'react';
import "./SideBar.scss";

@observer
export class SideBar {
    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li><button>Test Button</button></li>
                        <li><button>Test Button #2</button></li>
                    </ul>
                </nav>
            </div>
        )
    }
}