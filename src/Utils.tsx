import { Constants } from "./Constants";
import { NodeStore, ResizableNodesVisibility } from "./stores";
import { NodeCollectionStore, NodePosition } from "./stores";
import { TopBar } from "./views/nodes";
import { observer } from "mobx-react";
import * as React from 'react';

/**
 * Utility class for managing node operations
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
     * Renders a node with its content and top bar
     */
    public static renderNode = (className: string, store: NodeStore, collection: NodeCollectionStore, specificNodeContent: React.ReactNode) => {
        return (
            
            <div className={className} style={{
                transform: store.transform,
                width: store.width,
                height: store.height,
                opacity: store.opacity
            }} onWheel={(e: React.WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
            }} onClick={() => Utils.onClickEvent(collection, store)}>
                <TopBar store={store} />
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

    //**************************************************************** MAYBE RESTYLE THIS */

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
            store.opacity = 1;
            document.removeEventListener("pointermove", (e) => this.moveNewNode(e, store));
            console.log(store.x)
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
    public static moveNewNode = (e: PointerEvent, store: NodeStore) => {
        if (store.position == NodePosition.Unplaced) {
            store.x = e.x - store.width * Constants.UNPLACED_NODE_X_OFFSET;
            store.y = e.y - store.height * Constants.UNPLACED_NODE_Y_OFFSET;
        }
    }
}