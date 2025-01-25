import { observer } from "mobx-react";
import * as React from 'react';
import { CanvasNodeStore, NodeCollectionStore, StaticTextNodeStore, StoreType, VideoNodeStore } from "../../../stores";
import { ImageNodeView } from "../ImageNodeView";
import { ImageNodeStore } from "../../../stores/ImageNodeStore";
import { TextNodeView, VideoNodeView } from "..";
import { WebsiteNodeView } from "../WebsiteNodeView";
import { NodeLink } from "../../NodeLink/NodeLink";
import { Utils } from "../../../Utils";
import "./FreeFormCanvas.scss";

interface FreeFormProps {
    store: CanvasNodeStore // Treats the canvas as an individual node
    collection: NodeCollectionStore // Treats the canvas as a backdrop with multiple nodes
}

// Acts as the overall backdrop of the scene, being able to control the movement of the nodes
@observer
export class FreeFormCanvas extends React.Component<FreeFormProps> {
    
render() {
    let store = this.props.store;
    let collection = this.props.collection;
    if (store.isRenderedNode === false) {
        document.addEventListener("pointermove", (e) => Utils.moveNewNode(e, store));
        return (
            <div>
                {Utils.renderNode("node freeformcanvasNode", store, collection,
                                <div>
                                    <div className="freeformcanvas" style={{ transform: collection.transform }}>
                                        {collection.linkedNodes !== null ? 
                        collection.linkedNodes.map(linkedNodes => (
                            <NodeLink 
                                key={Utils.GenerateGuid()} 
                                node1={linkedNodes[0]}
                                node2={linkedNodes[1]} 
                                nodeCollection={collection}
                            />
                        )) : null
                    }
                    {collection.unselectedNodes.map(nodeStore => {
                        switch (nodeStore.type) {
                            case StoreType.Text:
                                return (<TextNodeView key={nodeStore.Id} store={nodeStore as StaticTextNodeStore} collection={collection}/>);
                            case StoreType.Video:
                                return (<VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore} collection={collection}/>);
                            case StoreType.Image:
                                return (<ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} collection={collection}/>);
                            case StoreType.Website:
                                return (<WebsiteNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} collection={collection}/>);
                            case StoreType.FreeformCanvas:
                                return (<FreeFormCanvas key={nodeStore.Id} store={nodeStore as CanvasNodeStore} collection={collection}/>);
                            default:
                                return null;
                        }
                    })}
                                    </div>
                                </div>)}
            </div>
        );
    }
    return (
        <div className="freeformcanvas-container" onPointerDown={e => Utils.alterNode(e, collection, "Move")}>
            <div className="freeformcanvas" style={{ transform: collection.transform }}>
                <div>
                    {collection.linkedNodes !== null ? 
                        collection.linkedNodes.map(linkedNodes => (
                            <NodeLink 
                                key={Utils.GenerateGuid()} 
                                node1={linkedNodes[0]}
                                node2={linkedNodes[1]} 
                                nodeCollection={collection}
                            />
                        )) : null
                        
                    }
                    {collection.unselectedNodes.map(nodeStore => {
                        switch (nodeStore.type) {
                            case StoreType.Text:
                                return (<TextNodeView key={nodeStore.Id} store={nodeStore as StaticTextNodeStore} collection={collection}/>);
                            case StoreType.Video:
                                return (<VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore} collection={collection}/>);
                            case StoreType.Image:
                                return (<ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} collection={collection}/>);
                            case StoreType.Website:
                                return (<WebsiteNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} collection={collection}/>);
                            case StoreType.FreeformCanvas:
                                const canvasNodeStore = nodeStore as CanvasNodeStore;
                                return (<FreeFormCanvas key={nodeStore.Id} store={nodeStore as CanvasNodeStore} collection={canvasNodeStore.childrenNodes}/>);
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
}
}