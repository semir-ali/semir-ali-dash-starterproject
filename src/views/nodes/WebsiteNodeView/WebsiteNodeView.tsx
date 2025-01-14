import { observer } from "mobx-react";
import * as React from 'react';
import { WebsiteNodeStore } from "../../../stores/WebsiteNodeStore";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";

interface WebsiteNodeProps {
    store: WebsiteNodeStore;
}

@observer
export class WebsiteNodeView extends React.Component<WebsiteNodeProps> {

    render() {
        let store = this.props.store;
        return (
            <div className="node websiteNode" style={{ transform: store.transform, width: store.width}} onWheel={(e: React.WheelEvent) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}>
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <iframe src={store.url} />
                    </div>
                </div>
            </div>
        );
    }
}