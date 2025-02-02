import { Constants } from "./Constants";
import { TopBar } from "./views/nodes";
import { CanvasType, StoreType, CanvasNodeStore, StaticTextNodeStore, VideoNodeStore, NodeCollectionStore, NodePosition, NodeStore, ResizableNodesVisibility } from "./stores";
import { FreeFormCanvas } from "./views/nodes/freeformcanvas/FreeFormCanvas";
import { WebsiteNodeStore } from "./stores/WebsiteNodeStore";
import { WebsiteNodeView } from "./views/nodes/WebsiteNodeView";
import { TextNodeView } from "./views/nodes";
import { VideoNodeView } from "./views/nodes";
import { ImageNodeStore } from "./stores/ImageNodeStore";
import { ImageNodeView } from "./views/nodes/ImageNodeView";
import { GridCanvas } from "./views/nodes/GridCanvas/GridCanvas";
import * as React from 'react';

/**
 * Utility class for managing shared node operations
 */
export class Utils {

    /**
     * Generates a unique GUID for a new node.
     */
    public static GenerateGuid() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    // The following methods are shared amongst all the nodes

    /**
     * Renders a canvas with a corresponding collection of nodes
     */
    public static renderCanvas = (collection: NodeCollectionStore, className: string, canvasType: CanvasType) => {
        return (
            collection.unselectedNodes.map(nodeStore => {
            switch (nodeStore.type) {
                case StoreType.Text:
                    return (<div key={Utils.GenerateGuid()} className={className}>
                    <TextNodeView key={nodeStore.Id} store={nodeStore as StaticTextNodeStore} nodeCollection={collection} canvastype={canvasType}/>
                    </div>);
                case StoreType.Video:
                    return (<div key={Utils.GenerateGuid()} className={className}>
                        <VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore} collection={collection}
                    canvastype={canvasType}/>
                    </div>);
                case StoreType.Image:
                    return (<div key={Utils.GenerateGuid()} className={className}>
                        <ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} collection={collection}
                    canvastype={canvasType}/>
                    </div>);
                case StoreType.Website:
                    return (<div key={Utils.GenerateGuid()} className={className}>
                        <WebsiteNodeView key={nodeStore.Id} store={nodeStore as WebsiteNodeStore} collection={collection}
                    canvastype={canvasType}/>
                    </div>);
                case StoreType.FreeformCanvas:
                    const canvasNode = nodeStore as CanvasNodeStore;
                    if (canvasNode.prevNode !== undefined) {
                        return (<div key={Utils.GenerateGuid()} className={className}>
                            <FreeFormCanvas key={nodeStore.Id} store={nodeStore as CanvasNodeStore} collection={canvasNode.childrenNodes} previousCollection={canvasNode.prevNode.childrenNodes} canvasType={canvasType}/>
                            </div>);
                    }
                    else {
                        return (<div key={Utils.GenerateGuid()} className={className}>
                            <FreeFormCanvas key={nodeStore.Id} store={nodeStore as CanvasNodeStore} collection={canvasNode.childrenNodes} previousCollection={canvasNode.childrenNodes} canvasType={canvasType}/>
                            </div>);
                    }
                case StoreType.Grid:
                    const gridCanvasNode = nodeStore as CanvasNodeStore;
                    if (gridCanvasNode.prevNode !== undefined) {
                        return (<div key={Utils.GenerateGuid()} className={className}>
                            <GridCanvas key={nodeStore.Id} store={nodeStore as CanvasNodeStore} collection={gridCanvasNode.childrenNodes} previousCollection={gridCanvasNode.prevNode.childrenNodes} canvasType={canvasType}/>
                            </div>);
                    }
                    else {
                        return (<div key={Utils.GenerateGuid()} className={className}>
                            <GridCanvas key={nodeStore.Id} store={nodeStore as CanvasNodeStore} collection={gridCanvasNode.childrenNodes} previousCollection={gridCanvasNode.childrenNodes} canvasType={canvasType}/>
                            </div>);
                        }
                default:
                    return null;
            }
        })
        )
    }
    
    /**
     * Renders a node with its content and top bar, is able to be resized based on if it is selected or not
     */
    public static renderNode = (className: string, canvasType: CanvasType, store: NodeStore, collection: NodeCollectionStore, 
        specificNodeContent: React.ReactNode) => {
        return ( 
            <div className={className} style={{
                transform: store.transform,
                width: store.width,
                height: store.height
            }} onWheel={(e: React.WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
            }} 
            onClick={() => Utils.onClickEvent(collection, store)}>
                <TopBar store={store} canvasType={canvasType} />
                <div className="scroll-box">
                    <div className="content">
                        {specificNodeContent}
                    </div>
                </div>
                <div className="resize-square-bottom-right" style={{visibility: store.resizableNodeVisibility}}
                onPointerDown={(e) => this.alterNode(e, store, "Resize Right")}></div>
                <div className="resize-square-right" style={{visibility: store.resizableNodeVisibility}}
                onPointerDown={(e) => this.alterNode(e, store, "Resize Right")}></div>
                <div className="resize-square-bottom" style={{visibility: store.resizableNodeVisibility}}
                onPointerDown={(e) => this.alterNode(e, store, "Resize")}></div>
                <div className="resize-square-bottom-left" style={{visibility: store.resizableNodeVisibility}}
                onPointerDown={(e) => this.alterNode(e, store, "Resize Left")}></div>
                <div className="resize-square-left" style={{visibility: store.resizableNodeVisibility}}
                onPointerDown={(e) => this.alterNode(e, store, "Resize Left")}></div>
            </div>
        )
    }


    /**
     * Changes the node in some way (either resizing or moving)
     */
    public static alterNode = (e: React.PointerEvent, store: NodeStore, altercation: string) => {
        e.stopPropagation();
        e.preventDefault();

        // Both onPointerMove and onPointerUp are constants within this method to prevent outside intervention (i.e. the freeformcanvas scrolling)
        // Pointer move either resizes or moves the node
        const onPointerMove = (e: PointerEvent) => {
            if (altercation === "Move") {
                store.x += e.movementX;
                store.y += e.movementY;
                // Meaning this is the freeform canvas the nodes are on
                if (store.type === null) {
                    store.xOffset += e.movementX;
                    store.yOffset += e.movementY;
                }
            }
            else {
                if (altercation === "Resize Left") {
                    store.width -= e.movementX;
                    store.height -= e.movementY;
                    store.x += e.movementX;
                    store.y += e.movementY;
                }
                else {
                    store.width += e.movementX;
                    store.height += e.movementY;
                }
            }
        };
        //Pointer up stops this resizing/moving
        const onPointerUp = () => {
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
        };
        // By default, when the pointer is down, both pointer move and pointer up activate
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
    };

    /**
     * Changes the capabilities of the node based on its current position
     */
    public static onClickEvent = (collection: NodeCollectionStore, store: NodeStore) => {
        // If the node is just created and has not been placed, places it (stops movement) and makes it unselected
        if (store.position === NodePosition.Unplaced) {
            store.position = NodePosition.Unselected;
            document.removeEventListener("pointermove", (e) => this.moveNewNode(e, store, collection));
        }
        // If the node has been placed but is unselected, selects it, meaning it is able to be removed and resized 
        else if (store.position === NodePosition.Unselected) {
            store.position = NodePosition.Selected;
            store.resizableNodeVisibility = ResizableNodesVisibility.Visible;
            collection.addSelectedNodes(store);
        }
        // If the node is selected, unselects it, making it moveable but not resizable
        else if (store.position === NodePosition.Selected) {
            store.position = NodePosition.Unselected;
            store.resizableNodeVisibility = ResizableNodesVisibility.Hidden;
            collection.removeSelectedNode(store);
        }
    };

    // When the node is first created, allows the user to move it around the canvas
    public static moveNewNode = (e: PointerEvent, store: NodeStore, collection: NodeCollectionStore) => {
        if (store.position === NodePosition.Unplaced) {
            store.x = e.x - (store.width * Constants.UNPLACED_NODE_X_OFFSET) - collection.xOffset;
            store.y = e.y - (store.height * Constants.UNPLACED_NODE_Y_OFFSET) - collection.yOffset;
        }
    }
}