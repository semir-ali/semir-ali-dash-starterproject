import { observer } from "mobx-react";
import * as React from 'react';
import { CanvasNodeStore, NodeCollectionStore, StaticTextNodeStore, StoreType, VideoNodeStore } from "../../../stores";
import { FreeFormCanvas } from "../freeformcanvas/FreeFormCanvas";
import { ImageNodeView } from "../ImageNodeView";
import { ImageNodeStore } from "../../../stores/ImageNodeStore";
import { TextNodeView, VideoNodeView } from "..";
import { WebsiteNodeView } from "../WebsiteNodeView";
import { CanvasType } from "../../../stores";
import "./GridCanvas.scss";

interface GridProps {
    store: CanvasNodeStore // Treats the canvas as an individual node
    collection: NodeCollectionStore // Treats the canvas as a backdrop with multiple nodes
}

// Acts as the overall backdrop of the scene, being able to control the movement of the nodes
@observer
export class GridCanvas extends React.Component<GridProps> {
    
render() {
    let collection = this.props.collection;
    return (
        <div className="container">
            {collection.unselectedNodes.map(nodeStore => {
                                    switch (nodeStore.type) {
                                        case StoreType.Text:
                                            return (<div className="box">
                                                <TextNodeView key={nodeStore.Id} store={nodeStore as StaticTextNodeStore} collection={collection} canvastype={CanvasType.Grid}/>
                                                </div>)
                                        case StoreType.Video:
                                            return (<div>
                                            <VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore} collection={collection}canvastype={CanvasType.Grid}/>
                                            </div>)
                                        case StoreType.Image:
                                            return (<div>
                                                <ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} collection={collection}
                                            canvastype={CanvasType.Grid}/>
                                            </div>)
                                        case StoreType.Website:
                                            return (<div className="box">
                                            <WebsiteNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} collection={collection} canvastype={CanvasType.Grid}/>
                                            </div>)
                                        case StoreType.FreeformCanvas:
                                            const canvasNode = nodeStore as CanvasNodeStore;
                                            return (<div>
                                                <FreeFormCanvas key={nodeStore.Id} store={nodeStore as CanvasNodeStore} collection={canvasNode.childrenNodes}/>
                                                </div>)
                                        default:
                                            return null
                                    }
                                })}
            </div>
    )
}
}