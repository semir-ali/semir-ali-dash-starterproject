import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore } from "../../../stores";
import { AudioNodeStore } from "../../../stores/AudioNodeStore";
import { Utils } from "../../../Utils";
import { CanvasType } from "../../../stores";
import "./AudioNodeView.scss";
import "../NodeView.scss";

interface AudioNodeProps {
    store: AudioNodeStore;
    nodeCollection: NodeCollectionStore;
    canvastype: CanvasType;
}
// Essentially acts as the visual display for the text node
@observer
export class AudioNodeView extends React.Component<AudioNodeProps> {
    render() {
        let store = this.props.store;
        let nodeCollection = this.props.nodeCollection;
        let canvasType = this.props.canvastype;
        let nodeContent = <div>
                            <audio controls>
                                <source src="horse.ogg" type="audio/ogg"/>
                            </audio>
                        </div>
        if (canvasType === CanvasType.FreeformCanvas) {
            document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store, nodeCollection))
        }
        return (
            Utils.renderNode("node audioNode", canvasType, store, nodeCollection,
                nodeContent))
        }
    }