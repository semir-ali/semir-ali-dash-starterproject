import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore } from "../../stores";
import { NodeCollectionStore } from "../../stores";

interface NodeLinkProps {
    node1: NodeStore;
    node2: NodeStore;
    collection: NodeCollectionStore;
}


// Acts as the overall backdrop of the scene, being able to control the movement of the nodes
@observer
export class NodeLink extends React.Component<NodeLinkProps> {

render() {
    const collection = this.props.collection;
    const node1 = this.props.node1;
    const node2 = this.props.node2;
    const initialX = node1.x + (node1.width/2);
    const initialY = node1.y + (node1.height/2);
    const finalX = node2.x + (node1.width/2);
    const finalY = node2.y + (node2.height/2);
    const distance = this.findProperty(initialX, initialY, finalX, finalY, "Distance");
    const angle = this.findProperty(initialX, initialY, finalX, finalY, "Angle of rotation");
    if (node1 != null && node2 != null) {
        return (
        <div
            className="nodelink"
            style={{
                position: "absolute",
                top: initialY,
                left: initialX,
                width: distance, // Width is the distance between the nodes
                height: "10px",
                backgroundColor: "blue",
                transform: `rotate(${angle}rad)`, // Allows the link to rotate
                transformOrigin: "0 50%", // Rotate around the starting point
                }}
                onClick={e => this.centerLinkedNode(e, collection, node1, node2)}
        ></div>
    );
    }
    }

    findProperty = (initialX: number, initialY: number, finalX: number, finalY: number, formula: string) => {
        const dx = finalX - initialX; // Change in x
        const dy = finalY - initialY; // Change in y
        if (formula === "Distance") {
            return Math.sqrt((dx * dx) + (dy * dy));
        }
        else if (formula === "Angle of rotation") {
            return Math.atan2(dy, dx);
        }
    }

    centerLinkedNode = (e: React.MouseEvent, collection: NodeCollectionStore, node1: NodeStore, node2: NodeStore) => {
        const node1DistanceFromCenter = this.findProperty(e.pageX, e.pageY, node1.centerX, node1.centerX + node1.centerY, "Distance") as number;
        const node2DistanceFromCenter = this.findProperty(e.pageX, e.pageY, node2.centerX, node2.centerY, "Distance") as number;
        var xDistanceFromMouse = 0;
        var yDistanceFromMouse = 0;
        console.log(node1.x)
        console.log(node2.x)
        if (node1DistanceFromCenter > node2DistanceFromCenter) {
            xDistanceFromMouse = node1.centerX - e.pageX;
            yDistanceFromMouse = node1.centerY - e.pageY;
        }
        else {
            xDistanceFromMouse = node2.centerX - e.pageX;
            yDistanceFromMouse = node2.centerY - e.pageY;
        }
        collection.moveAllNodes(xDistanceFromMouse, yDistanceFromMouse)
        collection.unselectAllNodes();
    }
}