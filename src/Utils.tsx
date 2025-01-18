import { NodeCollectionStore, NodePosition } from "./stores";
import { NodeStore } from "./stores";
import { TopBar } from "./views/nodes";
import { observer } from "mobx-react";
import * as React from 'react';

/**
 * This is a class that contains static methods. 
 * This means that the methods you write here can be accessed in the same way from anywhere else in the project (as long as this file is imported)
 * You do not need to make changes to this for the starter project (but you can!)
 */
export class Utils {

    /**
     * @returns an 8-4-4-4-12 character alphanumeric string
     */
    public static GenerateGuid() {

        /**
         * @returns a 4-character alphanumeric string
        */
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    // The following methods are shared amongst all the nodes

    /**
     * Renders a node based on its respected scss file, creates a top bar for it and generates its specific content (i.e. text boxes having editable text)
     */
    public static renderNode = (className: string, store: NodeStore, collection: NodeCollectionStore, specificNodeContent: React.ReactNode) => {
        return (
            <div className={className} style={{ transform: store.transform, width: store.width, height: store.height, outline:store.outline, opacity: store.opacity}} onWheel={(e: React.WheelEvent) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                        onClick={() => Utils.onClickEvent(collection, store)}>
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        {specificNodeContent}
                    </div>
                </div>
            </div>
        )
    }
    
    /**
     * Temporary resizing method (change later)
     */
    public static onKeyDown = (e: KeyboardEvent, store: NodeCollectionStore): void => {
        e.stopPropagation();
        e.preventDefault();

        // Only apply changes if the node is selected
        if (store.position = NodePosition.Selected) {
            switch (e.key) {
                case "ArrowRight":
                    // Increase width when pressing the right arrow
                    store.width += 1;
                    break;
                case "ArrowLeft":
                    // Decrease width when pressing the left arrow
                    store.width -= 1;
                    break;
                case "ArrowUp":
                    // Decrease height when pressing the up arrow
                    store.height -= 1;
                    break;
                case "ArrowDown":
                    // Increase height when pressing the down arrow
                    store.height += 1;
                    break;
                default:
                    break;
            }
        }
    };

    /**
     * Changes the capabilities of the node based on its current position
     */
    public static onClickEvent = (collection: NodeCollectionStore, store: NodeStore) => {
        // If the node is just created and has not been placed, places it (stops movement) and makes it unselected
        if (store.position === NodePosition.Unplaced) {
            store.position = NodePosition.Unselected
            store.opacity = 1;
            document.removeEventListener("pointermove", (e) => this.onPointerMove(e, store));
        }
        // If the node has been placed but is unselected, selects it, meaning it is able to be removed and resized 
        else if (store.position === NodePosition.Unselected) {
            store.position = NodePosition.Selected;
            store.outline = "10px blue solid";
            collection.addSelectedNodes(store);
            document.addEventListener("keydown", (e) => Utils.onKeyDown(e, collection));
        }
        // If the node is selected, unselects it, making it moveable but not resizable
        else if (store.position === NodePosition.Selected) {
            store.position = NodePosition.Unselected
            store.outline = "transparent";
            collection.removeSelectedNode(store);
            document.removeEventListener("keydown", (e) => Utils.onKeyDown(e, collection));
        }
    };

    // When the node is first created, allows the user to move it around the canvas
    public static onPointerMove = (e: PointerEvent, store: NodeStore) => {
        if (store.position == NodePosition.Unplaced) {
            store.x = e.x - store.width / 2;
            store.y = e.y - (7 * store.height/8);
        }
    }
}