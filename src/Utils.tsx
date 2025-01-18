import { NodeCollectionStore } from "./stores";
import { NodeStore } from "./stores";
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
    public static onKeyDown = (e: KeyboardEvent, store: NodeCollectionStore): void => {
        e.stopPropagation();
        e.preventDefault();

        // Only apply changes if the node is selected
        if (store.selected) {
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
    public static onClickEvent = (collection: NodeCollectionStore, store: NodeStore) => {
        console.log(store.placed)
        if (!store.placed) {
            store.placed = true;
            store.opacity = 1;
            document.removeEventListener("pointermove", (e) => this.onPointerMove(e, store));
        }
        else {
            if (!store.selected) {
                store.outline = "10px blue solid";
                collection.addSelectedNodes(store);

                document.addEventListener("keydown", (e) => Utils.onKeyDown(e, collection));
            } else {
                store.outline = "transparent";
                collection.removeSelectedNode(store);

                document.removeEventListener("keydown", (e) => Utils.onKeyDown(e, collection));
            }
            store.selected = !store.selected;
            }
    };

    public static onPointerMove = (e: PointerEvent, store: NodeStore) => {
        if (!store.placed) {
            store.x = e.x - store.width / 2;
            store.y = e.y - (7 * store.height/8);
        }
    }
}